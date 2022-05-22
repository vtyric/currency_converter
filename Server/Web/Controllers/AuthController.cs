using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Core.Helpers;
using Core.Models.AuthOptions;
using Core.Models.User;
using Core.Repositories;
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
    private readonly IRepository<User, DataContext> _users;

    public AuthController(IOptions<AuthOptions> authOptions, IRepository<User, DataContext> users)
    {
        _authOptions = authOptions;
        _users = users;
    }

    [Route("Login")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        var user = AuthenticateUser(request.Login, request.Password);

        if (user != null)
        {
            var token = GenerateJwtToken(user.Login, user.Id, user.Role);

            return Ok(new
            {
                accessToken = token
            });
        }

        return Unauthorized();
    }

    [Route("Register")]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterDto request)
    {
        var user = _users.GetByFilter(u => u.Login == request.Login);

        if (user != null)
            return BadRequest("пользователь с таким логином уже зарегистрирован");

        var newUser = await RegisterUser(request.Login, request.Password, request.Role);
        var token = GenerateJwtToken(newUser.Login, newUser.Id, newUser.Role);

        return Ok(new
        {
            accessToken = token
        });
    }

    private string GenerateJwtToken(string login, long id, string role)
    {
        var authParams = _authOptions.Value;

        var token = new JwtSecurityToken(
            authParams.Issuer,
            authParams.Audience,
            new List<Claim>
            {
                new("login", login),
                new("id", id.ToString()),
                new("role", role)
            },
            expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
            signingCredentials: new SigningCredentials(authParams.SymmetricSecurityKey,
                SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private User? AuthenticateUser(string login, string? password) =>
        _users.GetByFilter(u =>
            u.Login == login && CryptographyHelper.GetHashedPassword(u.Salt, password) == u.Password);

    private async Task<User> RegisterUser(string login, string password, string role)
    {
        await _users.Create(new User {Login = login, Password = password, Role = role});

        return _users.GetCurrentChange();
    }
}