using ShowMasterApp.Core.DTOs;

namespace ShowMasterApp.Business.Interfaces
{
    public interface IEventService
    {
        Task<List<EventDTO>> GetAllEvents();
        Task<EventDTO> GetEvent(int id);
        void CreateEvent(EventDTO eventDto);
        void UpdateEvent(EventDTO eventDto);
        void DeleteEvent(int id);
    }
}
