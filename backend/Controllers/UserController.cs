using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("user/")]
public class UserController : ControllerBase
{

    [HttpGet("login")]
    public User Get()
    {

        return new User("User");
    }
}
