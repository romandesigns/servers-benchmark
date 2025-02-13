using DotnetTasksApi.Data;
using DotnetTasksApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Configure PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



// CONTROLLER: retrieving all tasks
app.MapGet("/api/v1/get-tasks", async (AppDbContext db) =>
{
    try
    {
        var tasks = await db.Tasks.ToListAsync();
        return Results.Ok(new { success = true, message = "All tasks retrieved", data = tasks });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving tasks: {ex.Message}");
    }
});

// CONTROLLER: retrieving task
app.MapGet("/api/v1/{id:guid}/get-task", async (Guid id, AppDbContext db) =>
{
    try
    {
        var task = await db.Tasks.FindAsync(id);
        return task is not null ? Results.Ok(new { success = true, message = "Task retrieved", data = task }) : Results.NotFound("Task not found");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error retrieving task: {ex.Message}");
    }
});

// CONTROLLER: create task
app.MapPost("/api/v1/create-task", async (TaskItem task, AppDbContext db) =>
{
    try
    {
        if (task == null)
        {
            return Results.BadRequest(new { success = false, message = "Invalid task data" });
        }
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        return Results.Created($"/api/v1/get-task/{task.Id}", new
        {
            success = true,
            message = "Task created",
            data = task
        });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error creating task: {ex.Message}");
    }
});


// CONTROLLER: update task
app.MapPut("/api/v1/{id:guid}/update-task", async (Guid id, TaskItem updatedTask, AppDbContext db) =>
{
    try
    {
        var task = await db.Tasks.FindAsync(id);
        if (task is null) return Results.NotFound("Task not found");

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Complete = updatedTask.Complete;
        task.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return Results.Ok(new { success = true, message = "Task updated", data = task });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error updating task: {ex.Message}");
    }
});

// CONTROLLER: delete task
app.MapDelete("/api/v1/{id:guid}/delete-task", async (Guid id, AppDbContext db) =>
{
    try
    {
        var task = await db.Tasks.FindAsync(id);
        if (task is null)
            return Results.NotFound(new { success = false, message = "Task not found" });
            db.Tasks.Remove(task);
            await db.SaveChangesAsync();
            return Results.Ok(new { success = true, message = "Task deleted" });
        }
    catch (Exception ex)
    {
        return Results.Problem($"Error deleting task: {ex.Message}");
    }
});


app.Run();
