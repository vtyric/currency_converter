#nullable disable
using Microsoft.AspNetCore.Mvc;
using Core.Models.News;
using Core.Repositories;
using Web.DbContext;
using Web.Dtos.News;

namespace Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NewsController : ControllerBase
{
    private readonly IRepository<News, DataContext> _news;

    public NewsController(IRepository<News, DataContext> news)
    {
        _news = news;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<News>>> GetNews()
    {
        return (await _news.GetAll()).ToList();
    }

    [HttpPost]
    public async Task<IActionResult> AddNews([FromBody] AddNewsDto request)
    {
        await _news.Create(new News
        {
            Title = request.Title,
            Content = request.Content,
            Description = request.Description,
            PostCreationDate = DateTime.Now,
            Preview = request?.Preview,
            Source = request?.Source,
            Type = "post",
        });

        return Ok();
    }
}