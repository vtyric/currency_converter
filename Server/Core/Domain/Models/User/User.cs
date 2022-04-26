namespace Core
{
    public class User
    {
        public long Id { get; set; }
        public string Password { get; set; }
        public string Login { get; set; }
        public Role Role { get; set; }
    }
}