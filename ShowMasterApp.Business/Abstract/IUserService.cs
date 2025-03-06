using Microsoft.AspNetCore.Identity;

namespace ShowMasterApp.Business.Abstract
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(CreateUserViewModel model);
    }
}
