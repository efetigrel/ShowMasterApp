using ShowMasterApp.Core.Dtos;

public interface IUserListService
{
    Task<List<UserListDto>> GetAllUsers();
    Task<ResultDto> DeleteUser(string id); // int yerine string
}
