using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.Core.Entities;
using ShowMasterApp.DataAccess.Abstract;
using ShowMasterApp.DataAccess.Context;

namespace ShowMasterApp.DataAccess.Repository
{
    public class UserListRepository : IUserListRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserListRepository(AppDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<ResultDto> Delete(string id)
        {
            try
            {
                var userToDelete = await _context.Users.FindAsync(id);

                if (userToDelete != null)
                {
                    _context.Users.Remove(userToDelete);
                    await _context.SaveChangesAsync();

                    return new ResultDto
                    {
                        Message = "Kullanıcı silindi.",
                        Success = true
                    };
                }

                return new ResultDto
                {
                    Message = "Kullanıcı bulunamadı.",
                    Success = false
                };
            }
            catch (Exception ex)
            {
                return new ResultDto
                {
                    Message = $"Hata: {ex.Message}",
                    Success = false
                };
            }
        }

        public async Task<ResultDto> Update(UserListDto userDto)
        {
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == userDto.Id);

                if (existingUser != null)
                {
                    // FullName ve Email güncelleniyor
                    existingUser.FullName = userDto.FullName;
                    existingUser.Email = userDto.Email;

                    // Kullanıcının mevcut rollerini al
                    var currentRoles = await _userManager.GetRolesAsync(existingUser);

                    if (currentRoles.Any())
                    {
                        await _userManager.RemoveFromRolesAsync(existingUser, currentRoles);
                    }

                    // Yeni rolü kontrol et ve ata
                    var roleExists = await _roleManager.RoleExistsAsync(userDto.Role);
                    if (roleExists)
                    {
                        await _userManager.AddToRoleAsync(existingUser, userDto.Role);
                    }
                    else
                    {
                        return new ResultDto
                        {
                            Message = "Belirtilen rol bulunamadı.",
                            Success = false
                        };
                    }

                    _context.Users.Update(existingUser);
                    await _context.SaveChangesAsync();

                    return new ResultDto
                    {
                        Message = "Kullanıcı başarıyla güncellendi.",
                        Success = true
                    };
                }

                return new ResultDto
                {
                    Message = "Kullanıcı bulunamadı.",
                    Success = false
                };
            }
            catch (Exception ex)
            {
                return new ResultDto
                {
                    Message = $"Hata: {ex.Message}",
                    Success = false
                };
            }
        }

        public async Task<List<UserListDto>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            var userList = new List<UserListDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.Any() ? string.Join(", ", roles) : "Bilinmiyor";

                userList.Add(new UserListDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = role
                });
            }

            return userList;
        }
    }
}
