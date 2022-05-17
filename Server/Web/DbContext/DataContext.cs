using Core.Models.Comment;
using Core.Models.News;
using Core.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Web.DbContext;

public class DataContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }

    public DbSet<News> News { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Comment> Comments { get; set; }
}