using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotnetTasksApi.Models;

public class TaskItem
{
    [Key]
    [Column("id")] // 👈 Explicitly map to PostgreSQL column name
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Column("title")] // 👈 Ensure PostgreSQL compatibility
    public string Title { get; set; } = string.Empty;

    [Column("description")]
    public string? Description { get; set; }

    [Column("complete")]
    public bool Complete { get; set; } = false;

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
