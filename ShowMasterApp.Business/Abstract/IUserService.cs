using Microsoft.AspNetCore.Identity;
using ShowMasterApp.Core.Dtos;
using System.Threading.Tasks;

namespace ShowMasterApp.Business.Abstract
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(CreateUserDto dto);
        Task<SignInResult> LoginAsync(LoginDto dto);
    }
}
