
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{

    public DbSet<User> users { get; set; }

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {

    }
}