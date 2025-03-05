using ShowMasterApp.Core.DTOs;

public interface IEventRepository
{
    Task<List<EventDTO>> GetAll();
    Task<EventDTO> GetById(int id); 
    void Add(EventDTO ev);
    void Update(EventDTO ev);
    void Delete(int id);
}
