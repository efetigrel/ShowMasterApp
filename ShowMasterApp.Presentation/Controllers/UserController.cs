using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Core.Dtos;

//[Authorize(Roles = "Admin")] 
public class UserController : Controller
{
    private readonly IUserService _userService;
    private readonly IValidator<CreateUserDto> _createUserDtoValidator;
    private readonly IValidator<UserDto> _userDtoValidator;

    public UserController(IUserService userService, IValidator<CreateUserDto> createUserDtoValidator, IValidator<UserDto> userDtoValidator)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService)); // Ensure not null
        _createUserDtoValidator = createUserDtoValidator ?? throw new ArgumentNullException(nameof(createUserDtoValidator)); // Ensure not null
        _userDtoValidator = userDtoValidator ?? throw new ArgumentNullException(nameof(userDtoValidator)); // Ensure not null
    }

    public new async Task<IActionResult> User()
    {
        var users = await _userService.GetAllUsers() ?? new List<UserDto>();

        var viewModel = new UserCompositeViewModel
        {
            ListUser = users,
            CreateUser = new CreateUserDto(),
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
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }
            return View("User", new UserCompositeViewModel { CreateUser = dto, ListUser = await _userService.GetAllUsers() ?? new List<UserDto>() });
        }

        if (ModelState.IsValid)
        {
            var result = await _userService.CreateUserAsync(dto);
            if (result.Succeeded)
            {
                var user = await _userService.GetUserByEmailAsync(dto.Email);
                if (user != null)
                {
                    await _userService.AddUserToRoleAsync(user, dto.Role);
                }
                return RedirectToAction("User");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }

        return View("User", new UserCompositeViewModel { CreateUser = dto, ListUser = await _userService.GetAllUsers() ?? new List<UserDto>() });
    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteUser(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            ModelState.AddModelError("", "Geçersiz kullanıcı ID'si.");
            return RedirectToAction("User");
        }

        var deletedUser = await _userService.DeleteUser(id);

        if (deletedUser == null)
        {
            ModelState.AddModelError("", "Kullanıcı bulunamadı.");
        }

        return RedirectToAction("User");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateUser(UserDto userDto)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.UpdateUserAsync(userDto);
            if (result.Success)
            {
                return RedirectToAction("User");
            }
            else
            {
                ModelState.AddModelError(string.Empty, result.Message);
            }
        }
        // Hata durumunda ya da geçersiz model durumunda tekrar view'e gönderiyoruz.
        return View(userDto);
    }
}

