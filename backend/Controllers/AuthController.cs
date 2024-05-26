using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

using System.ComponentModel;
using Google.Apis.Auth;

[ApiController]
[Route("auth/")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("google")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto googleLoginDto)
    {

        Console.WriteLine(_configuration["Google:ClientId"]);
        var payload = await VerifyGoogleToken(googleLoginDto.Token);
        if (payload == null)
        {
            return BadRequest("Invalid Google token");
        }





        // Generate your own JWT token or other session management

        return Ok("user");
    }

    private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string token)
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

public class GoogleLoginDto
{
    public string Token { get; set; }
}

