using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Business.Interfaces;

namespace ShowMasterApp.Presentation.Controllers
{
    public class EventController : Controller
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        public IActionResult Index()
        {
            var events = _eventService.GetAllEvents();
            return View(events);
        }
    }
}
