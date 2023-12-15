package com.example.repository;

import com.example.model.GroupParticipant;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class GroupParticipantRepository implements PanacheRepository<GroupParticipant> {

}
