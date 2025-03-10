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

        public async Task<UserListDto> Delete(int id)
        {
            var eventToDelete = _context.Users.Find(id);
            if (eventToDelete != null)
            {
                _context.Users.Remove(eventToDelete);
                return await _context.SaveChanges();
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

