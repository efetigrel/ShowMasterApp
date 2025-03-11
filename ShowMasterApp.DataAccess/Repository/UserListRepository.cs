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

        public async Task<UserListDto?> Delete(string id)
        {
            var userToDelete = await _context.Users.FindAsync(id);

            if (userToDelete != null)
            {
                _context.Users.Remove(userToDelete);
                await _context.SaveChangesAsync();

                return new UserListDto
                {
                    Id = userToDelete.Id,
                    FullName = userToDelete.FullName,
                    Email = userToDelete.Email
                };
            }

            return null;
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

