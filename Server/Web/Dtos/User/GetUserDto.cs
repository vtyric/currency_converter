using Core.Models.User;

namespace Web.Dtos.User;

public class GetUserDto
{
    public int Id { get; set; }

    public string Login { get; set; }

    public Role Role { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? Email { get; set; }
}