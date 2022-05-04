#nullable disable
using Core.Models.User;
using Core.Repositories.UserRepository;
using Microsoft.AspNetCore.Mvc;
using Web.DbContext;
using Web.Dtos.User;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository<DataContext> _users;

        public UsersController(IUserRepository<DataContext> users)
        {
            _users = users;
        }

        [HttpGet]
        public async Task<IEnumerable<GetUserDto>> GetUsers() =>
            (await _users.GetAll()).Select(user => new GetUserDto
            {
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
                    Email = user?.Email,
                    FirstName = user?.FirstName,
                    LastName = user?.LastName,
                    MiddleName = user?.MiddleName,
                };
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto request)
        {
            await _users.UpdateUser(
                id,
                new User
                {
                    Email = request?.Email,
                    LastName = request?.LastName,
                    FirstName = request?.FirstName,
                    MiddleName = request?.MiddleName,
                },
                request?.Password
            );

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _users.DeleteById(id);

            return NoContent();
        }
    }
}