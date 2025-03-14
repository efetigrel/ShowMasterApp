using Microsoft.AspNetCore.Identity;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.Core.Entities;
using ShowMasterApp.DataAccess.Abstract;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IUserRepository _userRepository;

    public UserService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        RoleManager<IdentityRole> roleManager,
        IUserRepository userRepository)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _userRepository = userRepository;
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

    // ID ile kullanıcıyı getirme
    public async Task<UserDto> GetUserByIdAsync(string id)
    {
        return await _userRepository.GetById(id);
    }

    // Kullanıcıyı belirtilen role atama
    public async Task AddUserToRoleAsync(ApplicationUser user, string role)
    {
        await _userManager.AddToRoleAsync(user, role);
    }

    // Kullanıcıları listeleme
    public async Task<List<UserDto>> GetAllUsers()
    {
        return await _userRepository.GetAll();
    }

    // Kullanıcı güncelleme
    public Task<ResultDto> UpdateUserAsync(UserDto userDto)
    {
        return _userRepository.Update(userDto);
    }

    // Kullanıcı silme
    public async Task<ResultDto> DeleteUser(string id)
    {
        return await _userRepository.Delete(id);
    }
}
