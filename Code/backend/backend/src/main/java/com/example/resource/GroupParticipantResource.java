package com.example.resource;

import com.example.model.GroupParticipant;
import com.example.repository.GroupParticipantRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.engine.jdbc.mutation.spi.BindingGroup;

@Path("api/groupparticipant/")
public class GroupParticipantResource {
    @Inject
    GroupParticipantRepository groupParticipantRepository;

    @POST
    @Transactional
    @Path("signUpToGroup")
    @Consumes(MediaType.APPLICATION_JSON)
    public GroupParticipant signUpToGroup(GroupParticipant groupParticipant) {
        groupParticipantRepository.persist(groupParticipant);
        return groupParticipant;
    }
}
