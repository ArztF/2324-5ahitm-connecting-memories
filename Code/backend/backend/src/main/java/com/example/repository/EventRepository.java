package com.example.repository;

import com.example.model.Event;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class EventRepository implements PanacheRepository<Event> {
    @Inject
    EntityManager em;
}
