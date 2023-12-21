package com.example.resource;

import com.example.model.Event;
import com.example.repository.EventRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/event")
public class EventResource {
    @Inject
    EventRepository eventRepository;

    @GET
    public List<Event> getEvents() {
        return eventRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Event getEventById(@PathParam("id") Long id) {
        return eventRepository.findById(id);
    }

    @GET
    @Path("/getByGroupId/{id}")
    public List<Event> getEventsByGroupId(@PathParam("id") Long id) {
        return eventRepository.find("eventGroup.id", id).stream().toList();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Event createEvent(Event event) {
        eventRepository.persist(event);
        return event;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Event updateEvent(@PathParam("id") Long id, Event updatedEvent) {
        Event event = eventRepository.findById(id);
        if (event != null) {
            event.eventname = updatedEvent.eventname;
            event.location = updatedEvent.location;
            event.bannerimg = updatedEvent.bannerimg;
            event.beschreibung = updatedEvent.beschreibung;
            event.isPublic = updatedEvent.isPublic;
            event.enddate = updatedEvent.enddate;
            event.kategorie = updatedEvent.kategorie;
            event.locationcords = updatedEvent.locationcords;
            event.owner = updatedEvent.owner;
            event.startdate = updatedEvent.startdate;
            event.ticketpreis = updatedEvent.ticketpreis;
            event.veranstalter = updatedEvent.veranstalter;
            eventRepository.persist(event);
        }
        return event;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteEvent(@PathParam("id") Long id) {
        eventRepository.deleteById(id);
    }

}
