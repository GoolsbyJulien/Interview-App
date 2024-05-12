using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("questions/")]
public class Question : ControllerBase
{

    [HttpGet("get")]
    public string loadQuestion()
    {
        string[] allLines = System.IO.File.ReadAllLines("./questions.txt");
        Random rnd1 = new Random();
        Console.WriteLine();
        return allLines[rnd1.Next(allLines.Length)];
    }

}