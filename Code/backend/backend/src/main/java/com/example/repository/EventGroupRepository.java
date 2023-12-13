package com.example.repository;

import com.example.model.EventGroup;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.TypedQuery;

@ApplicationScoped
public class EventGroupRepository implements PanacheRepository<EventGroup> {

    public void getByOwnerId(long id) {

    }
}
