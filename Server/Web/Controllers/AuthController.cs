using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Core.Helpers;
using Core.Models.AuthOptions;
using Core.Models.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Web.DbContext;
using Web.Dtos.Auth;

namespace Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IOptions<AuthOptions> _authOptions;
    private readonly DataContext _context;

    public AuthController(IOptions<AuthOptions> authOptions, DataContext context)
    {
        _authOptions = authOptions;
        _context = context;
    }

    [Route("login")]
    [HttpPost]
    public IActionResult Login([FromBody] LoginDto request)
    {
        var user = AuthenticateUser(request.Login, request.Password);

        if (user != null)
        {
            var token = GenerateJwtToken(user.Login, user.Id, user.Role);

            return Ok(new
            {
                access_token = token
            });
        }

        return Unauthorized();
    }

    [Route("register")]
    [HttpPost]
    public IActionResult Register([FromBody] RegisterDto request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Login == request.Login);

        if (user != null)
            return BadRequest("пользователь с таким логином уже зарегистрирован");

        RegisterUser(request.Login, request.Password, request.Role);
        var token = GenerateJwtToken(request.Login, user?.Id ?? 2, request.Role);

        return Ok(new
        {
            access_token = token
        });
    }

    private string GenerateJwtToken(string login, long id, Role role)
    {
        var authParams = _authOptions.Value;

        var token = new JwtSecurityToken(
            authParams.Issuer,
            authParams.Audience,
            new List<Claim>
            {
                new("login", login),
                new("id", id.ToString()),
                new("role", role.ToString())
            },
            expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
            signingCredentials: new SigningCredentials(authParams.SymmetricSecurityKey,
                SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private User? AuthenticateUser(string login, string password) =>
        _context.Users
            .ToList()
            .FirstOrDefault(u =>
                u.Login == login && CryptographyHelper.GetHashedPassword(u.Salt, password) == u.Password);

    private void RegisterUser(string login, string password, Role role)
    {
        _context.Users.Add(new User {Login = login, Password = password, Role = role});
        _context.SaveChangesAsync();
    }
}