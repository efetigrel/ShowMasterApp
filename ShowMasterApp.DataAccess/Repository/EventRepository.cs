using ShowMasterApp.DataAccess.Entities;
using ShowMasterApp.DataAccess.Context;
using ShowMasterApp.Core.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ShowMasterApp.DataAccess.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;

        public EventRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventDTO>> GetAll()
        {
            var query = await (from e in _context.Events
                               select new EventDTO
                               {
                                   Id = e.Id,
                                   Date = e.Date,
                                   Name = e.Name

                               }).AsNoTracking().ToListAsync();
            return query;
        }

        public async Task<EventDTO> GetById(int id)
        {
            return await _context.Events
                .Where(e => e.Id == id)
                .Select(e => new EventDTO
                {
                    Id = e.Id,
                    Date = e.Date,
                    Name = e.Name
                })
                .AsNoTracking()
                .FirstOrDefaultAsync();  
        }


        public void Add(EventDTO ev)
        {
            var row = new Event
            {
                Id = ev.Id,
                Date = ev.Date, 
                Name = ev.Name
            };
            _context.Events.Add(row);
            _context.SaveChanges();
        }
        public void Update(EventDTO ev)
        {
            var existingEvent = _context.Events.FirstOrDefault(e => e.Id == ev.Id);
            if (existingEvent != null)
            {
                existingEvent.Name = ev.Name;
                existingEvent.Date = ev.Date;
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var eventToDelete = _context.Events.Find(id);
            if (eventToDelete != null)
            {
                _context.Events.Remove(eventToDelete);
                _context.SaveChanges();
            }
        }
    }
}
