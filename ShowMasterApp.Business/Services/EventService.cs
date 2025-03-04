using ShowMasterApp.Business.Interfaces;
using ShowMasterApp.Core.DTOs;
using ShowMasterApp.DataAccess.Entities;
using ShowMasterApp.DataAccess.RepositoryInterface;

namespace ShowMasterApp.Business.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public IEnumerable<EventDTO> GetAllEvents()
        {
            var events = _eventRepository.GetAll();
            return events.Select(e => new EventDTO { Name = e.Name, Date = e.Date }).ToList();
        }

        public EventDTO GetEvent(int id)
        {
            var ev = _eventRepository.GetById(id);
            return new EventDTO { Name = ev.Name, Date = ev.Date };
        }

        public void CreateEvent(EventDTO eventDto)
        {
            var ev = new Event { Name = eventDto.Name, Date = eventDto.Date };
            _eventRepository.Add(ev);
        }

        public void UpdateEvent(int id, EventDTO eventDto)
        {
            var ev = _eventRepository.GetById(id);
            ev.Name = eventDto.Name;
            ev.Date = eventDto.Date;
            _eventRepository.Update(ev);
        }

        public void DeleteEvent(int id)
        {
            _eventRepository.Delete(id);
        }
    }
}
