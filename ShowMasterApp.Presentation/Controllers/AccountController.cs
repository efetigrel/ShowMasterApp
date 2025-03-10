using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.Core.Entities;

public class AccountController : Controller
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IValidator<LoginDto> _loginDtoValidator;

    public AccountController(SignInManager<ApplicationUser> signInManager,
                             UserManager<ApplicationUser> userManager,
                             IValidator<LoginDto> loginDtoValidator)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _loginDtoValidator = loginDtoValidator;
    }

    [HttpGet]
    [AllowAnonymous] // 📌 Giriş yapmayan kullanıcılar bu sayfaya erişebilir
    public IActionResult Login(string returnUrl = null)
    {
        return View(new LoginDto { ReturnUrl = returnUrl });
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var validationResult = await _loginDtoValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }
            return View(dto);
        }

        if (ModelState.IsValid)
        {
            // 📌 Kullanıcıyı email veya username ile bul
            var user = await _userManager.FindByEmailAsync(dto.Email)
                        ?? await _userManager.FindByNameAsync(dto.Email);

            if (user == null)
            {
                ModelState.AddModelError("", "User not found.");
                return View(dto);
            }

            // 📌 Doğru kullanıcıyla giriş yap
            var result = await _signInManager.PasswordSignInAsync(user.UserName, dto.Password, dto.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError("", "Invalid login attempt.");
        }

        return View(dto);
    }


    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction("Login");
    }
}
