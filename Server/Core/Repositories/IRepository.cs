using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories;

public interface IRepository<TEntity, TDataContext>
    where TEntity : class
    where TDataContext : DbContext
{
    Task<IEnumerable<TEntity?>> GetAll();
    Task<TEntity?> GetById(int id);
    Task<TEntity?> GetByFilter(Expression<Func<TEntity, bool>> filter);
    TEntity GetCurrentChange();
    Task DeleteById(int id);
    Task Create(TEntity item);
    Task Save();
}