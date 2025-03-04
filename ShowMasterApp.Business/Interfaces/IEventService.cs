using ShowMasterApp.Core.DTOs;

namespace ShowMasterApp.Business.Interfaces
{
    public interface IEventService
    {
        IEnumerable<EventDTO> GetAllEvents();
        EventDTO GetEvent(int id);
        void CreateEvent(EventDTO eventDto);
        void UpdateEvent(int id, EventDTO eventDto);
        void DeleteEvent(int id);
    }
}
