using Microsoft.AspNetCore.Identity;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.Core.Entities;
using System.Threading.Tasks;

namespace ShowMasterApp.Business.Abstract
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(CreateUserDto dto);
        Task<SignInResult> LoginAsync(LoginDto dto);
        Task<ApplicationUser> GetUserByEmailAsync(string email);
        Task AddUserToRoleAsync(ApplicationUser user, string role); 
    }
}
