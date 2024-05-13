using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("questions/")]
public class Question : ControllerBase
{

    [HttpGet("get{amount}")]
    public string[] loadQuestion(int amount)
    {
        string[] questions = new string[amount];
        string[] allLines = System.IO.File.ReadAllLines("./questions.txt");
        Random rnd1 = new Random();
        Console.WriteLine("loading");

        for (int i = 0; i < amount; i++)
            questions[i] = allLines[rnd1.Next(allLines.Length)];
        return questions;
    }

}