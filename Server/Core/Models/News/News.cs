namespace Core.Models.News;

public class News
{
    public int Id { get; set; }

    public string Type { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public DateTime PostCreationDate { get; set; }

    public string? Preview { get; set; }

    public string? Source { get; set; }
}