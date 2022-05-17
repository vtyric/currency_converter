using Core.Models.Comment;
using Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Web.DbContext;
using Web.Dtos.Comments;
using Web.Dtos.User;

namespace Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly IRepository<Comment, DataContext> _comments;

    public CommentController(IRepository<Comment, DataContext> comments)
    {
        _comments = comments;
    }

    [HttpPost]
    public async Task<IActionResult> AddComment([FromBody] AddCommentDto request)
    {
        await _comments.Create(new Comment
        {
            CreationDate = DateTime.Now,
            Text = request.Text,
            NewsId = request.NewsId,
            UserId = request.UserId,
        });

        return Ok();
    }

    [HttpGet("{newsId}")]
    public List<GetCommentsByNewsIdDto> GetCommentByNewsId(int newsId)
    {
        return _comments
            .GetListByFilter(c => c?.News?.Id == newsId)
            .Select(c => new GetCommentsByNewsIdDto
            {
                CreationDate = c.CreationDate,
                Text = c.Text,
                User = new GetUserDto
                {
                    Id = c.User.Id,
                    Login = c.User.Login,
                    Role = c.User.Role,
                    LastName = c.User?.LastName,
                    FirstName = c.User?.FirstName,
                    MiddleName = c.User?.MiddleName,
                    Email = c.User?.Email,
                }
            })
            .ToList();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        await _comments.DeleteById(id);

        return NoContent();
    }
}