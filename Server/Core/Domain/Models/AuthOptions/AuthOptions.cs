using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Core.Domain.Models.AuthOptions
{
    public class AuthOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Secret { get; set; }
        public long TokenLifeTime { get; set; } //secs
        public SymmetricSecurityKey SymmetricSecurityKey => new(Encoding.ASCII.GetBytes(Secret));
    }
}