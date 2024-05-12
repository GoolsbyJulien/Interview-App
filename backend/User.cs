public class User
{
    public string UserName { get; set; }
    public int tokens { get; set; }

    public User(string username)
    {
        this.UserName = username;

    }

}