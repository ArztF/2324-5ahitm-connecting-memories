package com.example.repository;

import com.example.model.EventGroup;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EventGroupRepository implements PanacheRepository<EventGroup> {

}
