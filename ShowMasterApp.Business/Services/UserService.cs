using Microsoft.AspNetCore.Identity;
using ShowMasterApp.Business.Abstract;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.Core.Entities;

namespace ShowMasterApp.Business.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager; // ✅ RoleManager ekleniyor
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager; // ✅ RoleManager initialize ediliyor
        }

        // Kullanıcı oluşturma işlemi
        public async Task<IdentityResult> CreateUserAsync(CreateUserDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                // Rollerin veritabanında mevcut olup olmadığını kontrol et
                if (!await _roleManager.RoleExistsAsync("Admin"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                if (!await _roleManager.RoleExistsAsync("Moderator"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("Moderator"));
                }

                // Seçilen rolü kullanıcıya ata
                await _userManager.AddToRoleAsync(user, dto.Role);
            }

            return result;
        }

        // Kullanıcı giriş işlemi
        public async Task<SignInResult> LoginAsync(LoginDto dto)
        {
            return await _signInManager.PasswordSignInAsync(dto.Email, dto.Password, dto.RememberMe, lockoutOnFailure: false);
        }

        // Email ile kullanıcı bulma
        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        // Kullanıcıyı belirtilen role atama
        public async Task AddUserToRoleAsync(ApplicationUser user, string role)
        {
            await _userManager.AddToRoleAsync(user, role);
        }
    }
}
