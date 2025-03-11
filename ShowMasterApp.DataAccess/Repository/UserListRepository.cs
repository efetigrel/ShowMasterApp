using Microsoft.EntityFrameworkCore;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.DataAccess.Abstract;
using ShowMasterApp.DataAccess.Context;

namespace ShowMasterApp.DataAccess.Repository
{
    public class UserListRepository : IUserListRepository
    {
        private readonly AppDbContext _context;

        public UserListRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResultDto> Delete(string id)
        {
            var result = new ResultDto();
            try
            {
                var userToDelete = await _context.Users.FindAsync(id);

                if (userToDelete != null)
                {
                    _context.Users.Remove(userToDelete);
                    await _context.SaveChangesAsync();

                    return new ResultDto
                    {
                        Message = "Kullanıcı silidi.",
                        Success = true,
                      
                    };
                }
                else
                {
                    return new ResultDto
                    {
                        Message = "Kullanıcı bulunamadı.",
                        Success = false,

                    };
                }
            }
            catch (Exception ex)
            {

                return new ResultDto
                {
                    Message = ex.Message,
                    Success = false,

                };
            }

          

            
        }


        public async Task<List<UserListDto>> GetAll()
        {
            var userList = await (from e in _context.Users
                                  select new UserListDto
                                  {
                                      Id = e.Id,
                                      FullName = e.FullName,
                                      Email = e.Email

                                  }).AsNoTracking().ToListAsync();
            return userList;
        }
    }
}

