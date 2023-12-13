package com.example.repository;

import com.example.model.GroupParticipant;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GroupParticipantRepository implements PanacheRepository<GroupParticipant> {
}