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
    public async Task<ActionResult<IEnumerable<GetNewsDto>>> GetNews()
    {
        return (await _news.GetAll())
            .Select(n => new GetNewsDto
            {
                Id = n.Id,
                Title = n.Title,
                CommentsCount = n.Comments?.Count ?? 0,
                Description = n.Description,
                Content = n.Content,
                PostCreationDate = n.PostCreationDate,
                Preview = n?.Preview,
            })
            .ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetNewsDto>> GetNewsById(int id)
    {
        var news = await _news.GetById(id);

        return news == null
            ? NotFound()
            : new GetNewsDto
            {
                Id = news.Id,
                Title = news.Title,
                CommentsCount = news.Comments?.Count ?? 0,
                Description = news.Description,
                Content = news.Content,
                PostCreationDate = news.PostCreationDate,
                Preview = news?.Preview,
            };
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

    [HttpPost("{id}")]
    public async Task<IActionResult> UpdateNewsById(int id, [FromBody] UpdateNewsDto request)
    {
        if (await _news.GetById(id) is { } news)
        {
            news.Content = request?.Content ?? news.Content;
            news.Description = request?.Description ?? news.Description;
            news.Preview = request?.Preview ?? news.Preview;
            news.Source = request?.Source ?? news.Source;
            news.Title = request?.Title ?? news.Title;

            await _news.UpdateItem(news);

            return Ok();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNewsById(int id)
    {
        await _news.DeleteById(id);

        return NoContent();
    }
}