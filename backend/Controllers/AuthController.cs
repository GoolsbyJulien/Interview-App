using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

using System.ComponentModel;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("auth/")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    ApplicationDbContext _context;
    public AuthController(IConfiguration configuration, ApplicationDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("google")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleRequestData googleRequestData)
    {

        Console.WriteLine(_configuration["Google:ClientId"]);
        var payload = await VerifyGoogleToken(googleRequestData.Token);
        if (payload == null)
        {
            return BadRequest("Invalid Google token");
        }



        var user = await _context.users
                  .FirstOrDefaultAsync(u => u.email == payload.Email);


        if (user == null)
        {

            user = new User
            {
                email = payload.Email,
                tokens = 10

            };
            _context.Add(user);
        await _context.SaveChangesAsync();

        }


        // Generate your own JWT token or other session management

        return Ok(user);
    }

    private async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleToken(string token)
    {
        try
        {

            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _configuration["Google:ClientId"] }
            };
            Console.WriteLine(settings.Audience.Select(x => x.ToString()));

            var payload = await GoogleJsonWebSignature.ValidateAsync(token, settings);

            return payload;

        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }
}

public class GoogleRequestData
{
    public string Token { get; set; }
}

