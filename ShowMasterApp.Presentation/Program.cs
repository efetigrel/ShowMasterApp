using Microsoft.EntityFrameworkCore;
using ShowMasterApp.Business.Interfaces;
using ShowMasterApp.Business.Services;
using ShowMasterApp.DataAccess.Context;
using ShowMasterApp.DataAccess.Repository;
using ShowMasterApp.DataAccess.RepositoryInterface;

var builder = WebApplication.CreateBuilder(args);

// Veritaban� ba�lant�s�n� appsettings.json'dan al�yoruz
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));  // Burada ba�lant� dizesi kullan�l�yor

// DI container'a servisleri ekliyoruz
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IEventRepository, EventRepository>();

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
