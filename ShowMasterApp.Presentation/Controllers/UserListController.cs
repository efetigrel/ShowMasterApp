using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Business.Abstract;
using ShowMasterApp.Core.Dtos;

[Authorize(Roles = "Admin")]
public class UserListController : Controller
{
    private readonly IUserListService _userListService;
    private readonly IUserService _userService;
    private readonly IValidator<CreateUserDto> _createUserDtoValidator;

    public UserListController(IUserListService userListService, IUserService userService, IValidator<CreateUserDto> createUserDtoValidator)
    {
        _userService = userService;
        _createUserDtoValidator = createUserDtoValidator;
        _userListService = userListService;
    }

    // Kullanıcı listesini ve formu gönderen action
    public async Task<IActionResult> UserList()
    {
        var users = await _userListService.GetAllUsers() ?? new List<UserListDto>();  // Ensure it's never null
        var viewModel = new UserCompositeViewModel
        {
            UserList = users,
            CreateUser = new CreateUserDto()
        };
        return View(viewModel);
    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateUser([Bind(Prefix = "CreateUser")] CreateUserDto dto)
    {
        var validationResult = await _createUserDtoValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            Console.WriteLine("FluentValidation Hataları:");
            foreach (var error in validationResult.Errors)
            {
                Console.WriteLine($"Alan: {error.PropertyName}, Hata: {error.ErrorMessage}");
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }
            return View("UserList", new UserCompositeViewModel { CreateUser = dto, UserList = await _userListService.GetAllUsers() ?? new List<UserListDto>() });
        }

        if (ModelState.IsValid)
        {
            var result = await _userService.CreateUserAsync(dto);
            if (result.Succeeded)
            {
                return RedirectToAction("UserList");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }

        return View("UserList", new UserCompositeViewModel { CreateUser = dto, UserList = await _userListService.GetAllUsers() ?? new List<UserListDto>() });
    }

}
