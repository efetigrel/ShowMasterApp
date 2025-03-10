using ShowMasterApp.Core.Dtos;

namespace ShowMasterApp.Business.Abstract
{
    public interface IUserListService
    {
        Task<List<UserListDto>> GetAllUsers();
    }
}
