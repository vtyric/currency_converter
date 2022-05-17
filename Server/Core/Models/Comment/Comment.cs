namespace Core.Models.Comment;

public class Comment
{
    public int Id { get; set; }

    public string Text { get; set; }

    public DateTime CreationDate { get; set; }

    public virtual User.User? User { get; set; }

    public int UserId { get; set; }

    public virtual News.News? News { get; set; }

    public int NewsId { get; set; }
}