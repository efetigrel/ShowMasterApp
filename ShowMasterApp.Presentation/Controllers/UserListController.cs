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

    public async Task<IActionResult> UserList()
    {
        var users = await _userListService.GetAllUsers() ?? new List<UserListDto>();
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
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }
            return View("UserList", new UserCompositeViewModel { CreateUser = dto, UserList = await _userListService.GetAllUsers() ?? new List<UserListDto>() });
        }

        if (ModelState.IsValid)
        {
            var result = await _userService.CreateUserAsync(dto);
            if (result.Succeeded)
            {
                // Kullanıcı başarılı şekilde oluşturuldu, şimdi rol ekleyelim
                var user = await _userService.GetUserByEmailAsync(dto.Email);
                if (user != null)
                {
                    await _userService.AddUserToRoleAsync(user, dto.Role);
                }
                return RedirectToAction("UserList");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }

        return View("UserList", new UserCompositeViewModel { CreateUser = dto, UserList = await _userListService.GetAllUsers() ?? new List<UserListDto>() });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteUser(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            ModelState.AddModelError("", "Geçersiz kullanıcı ID'si.");
            return RedirectToAction("UserList");
        }

        var deletedUser = await _userListService.DeleteUser(id);

        if (deletedUser == null)
        {
            ModelState.AddModelError("", "Kullanıcı bulunamadı.");
        }

        return RedirectToAction("UserList");
    }

    //[HttpPost]
    //[ValidateAntiForgeryToken]
    //public async Task<IActionResult> UpdateUser([Bind(Prefix = "UpdateUser")] UserListDto dto)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return View("UserList", new UserCompositeViewModel
    //        {
    //            UserList = await _userListService.GetAllUsers() ?? new List<UserListDto>(),
    //            CreateUser = new CreateUserDto()
    //        });
    //    }

    //    var result = await _userListService.UpdateUser(dto);
    //    if (result.Succeeded)
    //    {
    //        return RedirectToAction("UserList");
    //    }

    //    ModelState.AddModelError("", "Kullanıcı güncellenemedi.");
    //    return View("UserList", new UserCompositeViewModel
    //    {
    //        UserList = await _userListService.GetAllUsers() ?? new List<UserListDto>(),
    //        CreateUser = new CreateUserDto()
    //    });
    //}

}
