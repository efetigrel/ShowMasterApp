using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Business.Abstract;
using ShowMasterApp.Presentation.Models;

[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly IUserService _userService;

    // Dependency Injection ile IUserService'i alıyoruz
    public AdminController(IUserService userService)
    {
        _userService = userService;
    }

    public IActionResult CreateUser()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateUser(CreateUserViewModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.CreateUserAsync(model);

            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }

            // Hataları ekle
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }
        return View(model);
    }
}
