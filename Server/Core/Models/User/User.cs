using static Core.Helpers.CryptographyHelper;

namespace Core.Models.User;

public class User
{
    private string _password;

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
}