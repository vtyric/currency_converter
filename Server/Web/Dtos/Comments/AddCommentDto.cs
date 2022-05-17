namespace Web.Dtos.Comments;

public class AddCommentDto
{
    public int UserId { get; set; }

    public int NewsId { get; set; }

    public string Text { get; set; }
}