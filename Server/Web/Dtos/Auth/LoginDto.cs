using System.ComponentModel.DataAnnotations;

namespace Web.Auth.Dtos
{
    public class LoginDto
    {
        [Required] 
        public string Login { get; set; }

        [Required] 
        public string Password { get; set; }
    }
}