package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class GroupParticipant extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "customer_id")
    public Customer customer;

    @ManyToOne
    @JoinColumn(name = "eventgroup_id")
    public EventGroup eventGroup;
}
