using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;


namespace Core.Repositories;

public class Repository<TEntity, TDataContext> : IRepository<TEntity, TDataContext>
    where TEntity : class
    where TDataContext : DbContext
{
    protected readonly TDataContext _dataContext;
    protected readonly DbSet<TEntity> _dbSet;

    public Repository(TDataContext dataContext)
    {
        _dataContext = dataContext;
        _dbSet = dataContext.Set<TEntity>();
    }

    public async Task<IEnumerable<TEntity>> GetAll() => await _dbSet.ToListAsync();

    public async Task<TEntity?> GetById(int id) => await _dbSet.FindAsync(id);

    public TEntity? GetByFilter(Func<TEntity, bool> filter) =>
        _dbSet
            .ToList()
            .Where(filter)
            .FirstOrDefault();

    public TEntity GetCurrentChange() => _dbSet.Local.First();

    public async Task DeleteById(int id)
    {
        if (await GetById(id) is { } toDelete)
            _dbSet.Remove(toDelete);

        await _dataContext.SaveChangesAsync();
    }

    public async Task Create(TEntity item)
    {
        await _dbSet.AddAsync(item);

        await _dataContext.SaveChangesAsync();
    }

    public async Task Save() => await _dataContext.SaveChangesAsync();
}