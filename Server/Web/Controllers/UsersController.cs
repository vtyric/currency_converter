#nullable disable
using Core.Models.User;
using Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Web.DbContext;
using Web.Dtos.User;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User, DataContext> _users;

        public UsersController(IRepository<User, DataContext> users)
        {
            _users = users;
        }

        [HttpGet]
        public async Task<IEnumerable<GetUserDto>> GetUsers() =>
            (await _users.GetAll()).Select(user => new GetUserDto
            {
                Login = user.Login,
                Role = user.Role,
                Id = user.Id,
                Email = user?.Email,
                FirstName = user?.FirstName,
                LastName = user?.LastName,
                MiddleName = user?.MiddleName,
            });

        [HttpGet("{id}")]
        public async Task<ActionResult<GetUserDto>> GetUser(int id)
        {
            var user = await _users.GetById(id);

            return user == null
                ? NotFound()
                : new GetUserDto
                {
                    Login = user.Login,
                    Role = user.Role,
                    Id = user.Id,
                    Email = user?.Email,
                    FirstName = user?.FirstName,
                    LastName = user?.LastName,
                    MiddleName = user?.MiddleName,
                };
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto request)
        {
            var user = await _users.GetById(id);

            if (user == null)
                return NotFound();

            user.Email = request?.Email ?? user.Email;
            user.FirstName = request?.FirstName ?? user.FirstName;
            user.LastName = request?.LastName ?? user.LastName;
            user.MiddleName = request?.MiddleName ?? user.MiddleName;
            user.Role = request?.Role ?? user.Role;
            user.Password = request?.Password ?? user.Password;

            await _users.UpdateItem(user);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _users.DeleteById(id);

            return NoContent();
        }
    }
}