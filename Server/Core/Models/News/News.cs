using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Core.Models.News;

public class News
{
    private readonly ILazyLoader _lazyLoader;

    private List<Comment.Comment>? _comments;

    public News()
    {
    }

    public News(ILazyLoader lazyLoader)
    {
        _lazyLoader = lazyLoader;
    }

    public int Id { get; set; }

    public string Type { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public DateTime PostCreationDate { get; set; }

    public string? Preview { get; set; }

    public string? Source { get; set; }

    public virtual List<Comment.Comment>? Comments
    {
        get => _lazyLoader.Load(this, ref _comments);
        set => _comments = value;
    }
}