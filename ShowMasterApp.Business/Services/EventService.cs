using ShowMasterApp.Business.Interfaces;
using ShowMasterApp.Core.DTOs;

namespace ShowMasterApp.Business.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<List<EventDTO>> GetAllEvents()
        {
            return await _eventRepository.GetAll();
        }

        public async Task<EventDTO> GetEvent(int id)
        {
            return await _eventRepository.GetById(id);
        }

        public void CreateEvent(EventDTO eventDto)
        {
            _eventRepository.Add(eventDto);
        }

        public void UpdateEvent(EventDTO eventDto)
        {
            _eventRepository.Update(eventDto);
        }

        public void DeleteEvent(int id)
        {
            _eventRepository.Delete(id);
        }
    }
}
