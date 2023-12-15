package com.example.resource;

import com.example.model.Event;
import com.example.model.GroupParticipant;
import com.example.repository.GroupParticipantRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.engine.jdbc.mutation.spi.BindingGroup;

import java.util.List;

@Path("api/groupparticipant/")
public class GroupParticipantResource {
    @Inject
    GroupParticipantRepository groupParticipantRepository;

    @GET
    public List<GroupParticipant> getEvents() {
        return groupParticipantRepository.listAll();
    }

    @POST
    @Transactional
    @Path("signUpToGroup")
    @Consumes(MediaType.APPLICATION_JSON)
    public GroupParticipant signUpToGroup(GroupParticipant groupParticipant) {
        groupParticipantRepository.persist(groupParticipant);
        return groupParticipant;
    }

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<GroupParticipant> getAllParticipants() {
        return groupParticipantRepository.findAll().stream().toList();
    }
}
