using Web.Dtos.User;

namespace Web.Dtos.Comments;

public class GetCommentsByNewsIdDto
{
    public GetUserDto User { get; set; }

    public string Text { get; set; }

    public DateTime CreationDate { get; set; }
}