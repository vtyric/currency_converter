using Core.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories.UserRepository;

public interface IUserRepository<TDataContext> : IRepository<User, TDataContext>
    where TDataContext : DbContext
{
    Task UpdateUser(int id, User userForUpdate, string? newPassword = null);
}