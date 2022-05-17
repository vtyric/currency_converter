namespace Web.Dtos.News;

public class GetNewsDto
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public DateTime PostCreationDate { get; set; }

    public string? Preview { get; set; }

    public int CommentsCount { get; set; }
}