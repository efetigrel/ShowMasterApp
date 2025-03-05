using Microsoft.AspNetCore.Mvc;
using ShowMasterApp.Business.Interfaces;
using ShowMasterApp.Core.DTOs;

namespace ShowMasterApp.Presentation.Controllers
{
    public class EventController : Controller
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        // Index (Listeleme)
        public async Task<IActionResult> Index()
        {
            var events = await _eventService.GetAllEvents(); 
            return View(events);
        }

        // Create (Yeni Etkinlik Oluşturma - GET)
        public IActionResult Create()
        {
            return View(new EventDTO());  
        }

        [HttpPost]
        public IActionResult Create(EventDTO eventDto)
        {
            if (ModelState.IsValid)
            {
                _eventService.CreateEvent(eventDto);
                return RedirectToAction("Index");
            }
            return View(eventDto);  
        }

        // Edit (Etkinlik Düzenleme - GET)
        public IActionResult Edit(EventDTO eventDto)
        {
            if (ModelState.IsValid)
            {
                _eventService.UpdateEvent(eventDto);
                return RedirectToAction("Index");
            }
            return View(eventDto);
        }

        // Delete (Etkinlik Silme - GET)
        public async Task<IActionResult> Delete(int id)
        {
            var eventDto = await _eventService.GetEvent(id);
            if (eventDto == null)
                return NotFound();

            return View(eventDto);
        }


        // Delete (Etkinlik Silme - POST)
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            _eventService.DeleteEvent(id);
            return RedirectToAction("Index");
        }
    }
}
