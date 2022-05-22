using System.ComponentModel.DataAnnotations;
using Core.Models.User;

namespace Web.Dtos.Auth;

public class RegisterDto
{
    [Required] 
    public string Login { get; set; }

    [Required] 
    public string Password { get; set; }

    [Required] 
    public string Role { get; set; }
}