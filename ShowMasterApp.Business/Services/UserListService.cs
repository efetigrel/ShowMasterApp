using ShowMasterApp.Business.Abstract;
using ShowMasterApp.Core.Dtos;
using ShowMasterApp.DataAccess.Abstract;

namespace ShowMasterApp.Business.Services
{
    public class UserListService : IUserListService
    {
        private readonly IUserListRepository _userListRepository;

        public UserListService(IUserListRepository userListRepository)
        {
            _userListRepository = userListRepository;
        }
        public async Task<List<UserListDto>> GetAllUsers()
        {
            return await _userListRepository.GetAll();
        }
    }
}
