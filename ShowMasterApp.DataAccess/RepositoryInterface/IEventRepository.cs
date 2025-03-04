﻿using ShowMasterApp.DataAccess.Entities;
namespace ShowMasterApp.DataAccess.RepositoryInterface
{
    public interface IEventRepository
    {
        List<Event> GetAll();
        Event GetById(int id);
        void Add(Event ev);
        void Update(Event ev);
        void Delete(int id);
    }
}
