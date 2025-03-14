using Microsoft.AspNetCore.Identity;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.Core.Entities;

public interface IUserService
{
    Task<IdentityResult> CreateUserAsync(CreateUserDto dto);
    Task<SignInResult> LoginAsync(LoginDto dto);
    Task<ApplicationUser> GetUserByEmailAsync(string email);

    Task<UserDto> GetUserByIdAsync(string id);
    Task AddUserToRoleAsync(ApplicationUser user, string role);
    Task<List<UserDto>> GetAllUsers();
    Task<ResultDto> DeleteUser(string id);
    Task<ResultDto> UpdateUserAsync(UserDto dto);
}
