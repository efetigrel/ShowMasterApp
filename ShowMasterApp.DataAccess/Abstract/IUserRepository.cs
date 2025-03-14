using ShowMasterApp.Core.Dtos;

namespace ShowMasterApp.DataAccess.Abstract
{
    public interface IUserRepository
    {
        Task<List<UserDto>> GetAll();
        Task<ResultDto> Delete(string id);
        Task<ResultDto> Update(UserDto user);
        Task<UserDto> GetById(string id);
    }
}
