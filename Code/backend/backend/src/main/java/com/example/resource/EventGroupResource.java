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
    public EventGroup createGroup(EventGroup eventGroup) {
        eventGroupRepository.persist(eventGroup);
        return eventGroup;
    }

    @GET
    @Path("byOwnerId/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<EventGroup> getEventGroupByOwnerId(@PathParam("id") long id) {
        return eventGroupRepository.find("groupAdmin.id", id).stream().toList();
    }
}
