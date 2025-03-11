using ShowMasterApp.Core.Dtos;

public interface IUserListService
{
    Task<List<UserListDto>> GetAllUsers();
    Task<UserListDto> DeleteUser(string id); // int yerine string
}
