using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories;

public interface IRepository<TEntity, TDataContext>
    where TEntity : class
    where TDataContext : DbContext
{
    Task<IEnumerable<TEntity?>> GetAll();
    Task<TEntity?> GetById(int id);
    TEntity? GetByFilter(Func<TEntity, bool> filter);
    List<TEntity> GetListByFilter(Func<TEntity, bool> filter);
    TEntity GetCurrentChange();
    Task DeleteById(int id);
    Task Create(TEntity item);
    Task Save();
    Task UpdateItem(TEntity item);
}