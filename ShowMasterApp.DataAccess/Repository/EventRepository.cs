using ShowMasterApp.DataAccess.Entities;
using ShowMasterApp.DataAccess.Context;
using ShowMasterApp.DataAccess.RepositoryInterface;

namespace ShowMasterApp.DataAccess.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;

        public EventRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Event> GetAll() => _context.Events.ToList();
        public Event GetById(int id) => _context.Events.FirstOrDefault(e => e.Id == id);
        public void Add(Event ev) { _context.Events.Add(ev); _context.SaveChanges(); }
        public void Update(Event ev) { _context.Events.Update(ev); _context.SaveChanges(); }
        public void Delete(int id) { var eventToDelete = _context.Events.FirstOrDefault(e => e.Id == id); if (eventToDelete != null) { _context.Events.Remove(eventToDelete); _context.SaveChanges(); } }
    }
}
