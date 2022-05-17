using Microsoft.EntityFrameworkCore.Infrastructure;
using static Core.Helpers.CryptographyHelper;

namespace Core.Models.User;

public class User
{
    private string _password;
    private List<Comment.Comment>? _comments;

    private readonly ILazyLoader _lazyLoader;

    public User(ILazyLoader lazyLoader)
    {
        Salt = GetSalt();
        _lazyLoader = lazyLoader;
    }

    public User()
    {
        Salt = GetSalt();
    }

    public int Id { get; set; }

    public string Salt { get; set; }

    public string Password
    {
        get => _password;
        set => _password = GetHashedPassword(Salt, value);
    }

    public string Login { get; set; }

    public Role Role { get; set; }

    public virtual List<Comment.Comment>? Comments
    {
        get => _lazyLoader.Load(this, ref _comments);
        set => _comments = value;
    }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? Email { get; set; }
}