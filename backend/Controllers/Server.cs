
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("health")]
public class Sever : ControllerBase
{

    [HttpGet]
    public HttpResponseMessage health()
    {


        return new HttpResponseMessage(System.Net.HttpStatusCode.Accepted);
    }
}