#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Models.News;
using Web.DbContext;
using Web.Dtos.News;

namespace Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NewsController : ControllerBase
{
    private readonly DbSet<News> _news;

    public NewsController(DataContext context)
    {
        _news = context.News;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<News>>> GetNews()
    {
        return await _news.ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> AddNews([FromBody] AddNewsDto request)
    {
        return Ok();
    }
}