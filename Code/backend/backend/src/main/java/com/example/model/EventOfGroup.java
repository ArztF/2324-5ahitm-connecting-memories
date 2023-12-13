package com.example.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class EventOfGroup extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "event_id")
    public Event event;

    @ManyToOne
    @JoinColumn(name = "eventGroup_id")
    public EventGroup eventGroupId;
}
