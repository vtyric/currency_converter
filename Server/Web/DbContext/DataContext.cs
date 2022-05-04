using Core.Models.News;
using Core.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Web.DbContext;

public class DataContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<News> News { get; set; }

    public DbSet<User> Users { get; set; }
}