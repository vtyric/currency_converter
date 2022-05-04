using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;


namespace Core.Repositories;

public class Repository<TEntity, TDataContext> : IRepository<TEntity, TDataContext>
    where TEntity : class
    where TDataContext : DbContext
{
    private readonly TDataContext _dataContext;
    private readonly DbSet<TEntity> _dbSet;

    public Repository(TDataContext dataContext)
    {
        _dataContext = dataContext;
        _dbSet = dataContext.Set<TEntity>();
    }

    public async Task<IEnumerable<TEntity>> GetAll() => await _dbSet.ToListAsync();

    public async Task<TEntity?> GetById(int id) => await _dbSet.FindAsync(id);

    public async Task<TEntity?> GetByFilter(Expression<Func<TEntity, bool>> filter) =>
        await _dbSet.Where(filter).FirstOrDefaultAsync();

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