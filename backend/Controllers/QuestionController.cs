using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("questions/")]
public class Question : ControllerBase
{
    private readonly ILogger _logger;

    public Question(ILogger<Question> logger)
    {
        _logger = logger;
    }

    [HttpGet("get{amount}")]
    public string[] loadQuestion(int amount)
    {

        string[] questions = new string[amount];
        string[] allLines = System.IO.File.ReadAllLines("./questions.txt");
        Random rnd1 = new Random();
         _logger.LogInformation($"loading {amount} questions");

        for (int i = 0; i < amount; i++)
            questions[i] = allLines[rnd1.Next(allLines.Length)];
        return questions;
    }

}