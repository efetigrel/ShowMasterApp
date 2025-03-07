using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Business.Abstract;
using ShowMasterApp.Core.Dtos;

[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly IUserService _userService;
    private readonly IValidator<CreateUserDto> _createUserDtoValidator;

    public AdminController(IUserService userService, IValidator<CreateUserDto> createUserDtoValidator)
    {
        _userService = userService;
        _createUserDtoValidator = createUserDtoValidator;
    }

    public IActionResult CreateUser()
    {
        return View(new CreateUserDto());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateUser(CreateUserDto dto)
    {
        // FluentValidation ile DTO'yu doğruluyoruz
        var validationResult = await _createUserDtoValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            // Hataları ModelState'e ekliyoruz
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }
            return View(dto);
        }

        if (ModelState.IsValid)
        {
            var result = await _userService.CreateUserAsync(dto);

            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }

            // Hataları ekliyoruz
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }

        return View(dto);
    }
}
