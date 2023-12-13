package com.example.resource;

import com.example.model.EventGroup;
import com.example.repository.EventGroupRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/eventgroup/")
public class EventGroupResource {
    @Inject
    EventGroupRepository eventGroupRepository;

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<EventGroup> getAllEventGroups() {
        return eventGroupRepository.listAll();
    }

    @POST
    @Transactional
    @Path("addEventGroup")
    @Consumes(MediaType.APPLICATION_JSON)
    public EventGroup persistGroup(EventGroup eventGroup) {
        eventGroupRepository.persist(eventGroup);
        return eventGroup;
    }
}
