using ShowMasterApp.Core.Dtos;

namespace ShowMasterApp.DataAccess.Abstract
{
    public interface IUserListRepository
    {
        Task<List<UserListDto>> GetAll();
        Task<UserListDto> Delete(string id);
    }
}
