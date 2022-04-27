using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Core;
using Core.Domain.Models.AuthOptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Web.Auth.Dtos;
using Web.Dtos.Auth;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private long _id = 100;

        private readonly IOptions<AuthOptions> _authOptions;

        private readonly List<User> _users = new()
        {
            new User {Id = 1, Login = "sada", Password = "1234", Role = Role.User},
            new User {Id = 2, Login = "asda", Password = "123123", Role = Role.User},
            new User {Id = 3, Login = "admin", Password = "admin1234", Role = Role.Admin},
        };

        public AuthController(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
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
                    access_token = token,
                });
            }

            return Unauthorized();
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] RegisterDto request)
        {
            var user = _users.FirstOrDefault(u => u.Login == request.Login);

            if (user != null)
                return BadRequest("пользователь с таким логином уже зарегистрирован");

            RegisterUser(request.Login, request.Password, request.Role);
            var token = GenerateJwtToken(request.Login, _id, request.Role);

            return Ok(new
            {
                access_token = token,
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

        private User AuthenticateUser(string login, string password)
        {
            return _users.SingleOrDefault(u => u.Login == login && u.Password == password);
        }

        private void RegisterUser(string login, string password, Role role)
        {
            _users.Add(new User {Login = login, Id = _id++, Password = password, Role = role});
        }
    }
}