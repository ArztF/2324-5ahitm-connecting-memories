package com.example.resource;

import com.example.model.Event;
import com.example.model.EventOfGroup;
import com.example.repository.EventGroupRepository;
import com.example.repository.EventOfGroupRepository;
import com.example.repository.EventRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

@Path("api/eventOfGroup/")
public class EventOfGroupResource {
    @Inject
    EventOfGroupRepository eventOfGroupRepository;

    @Inject
    EventRepository eventRepository;

    @POST
    @Transactional
    @Path("addEventToGroup")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addEventToGroup(Event event) {
        eventRepository.persist(event);
        // eventOfGroupRepository.persist(eventOfGroup);
    }
}
