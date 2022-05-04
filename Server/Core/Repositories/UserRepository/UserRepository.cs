using Core.Helpers;
using Core.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories.UserRepository;

public class UserRepository<TDataContext>
    : Repository<User, TDataContext>, IUserRepository<TDataContext>
    where TDataContext : DbContext
{
    public UserRepository(TDataContext dataContext) : base(dataContext)
    {
    }

    public async Task UpdateUser(int id, User userForUpdate, string? newPassword = null)
    {
        if (await GetById(id) is { } user)
        {
            user.Email = userForUpdate?.Email;
            user.FirstName = userForUpdate?.FirstName;
            user.LastName = userForUpdate?.LastName;
            user.MiddleName = userForUpdate?.MiddleName;

            if (newPassword != null)
                user.Password = newPassword;

            _dataContext.Entry(user).State = EntityState.Modified;
            await Save();
        }
    }
}