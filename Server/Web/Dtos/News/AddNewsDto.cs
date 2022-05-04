namespace Web.Dtos.News;

public class AddNewsDto
{
    public string Title { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public string? Preview { get; set; }

    public string? Source { get; set; }
}