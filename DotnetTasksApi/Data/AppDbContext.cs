using Microsoft.EntityFrameworkCore;
using DotnetTasksApi.Models;

namespace DotnetTasksApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>().ToTable("tasks");

        modelBuilder.Entity<TaskItem>()
            .Property(t => t.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnUpdate();
    }
}
