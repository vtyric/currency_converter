using Core;

namespace Web.Dtos.Auth
{
    public class RegisterDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}