package com.example.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Gruppen extends PanacheEntity{

    @ManyToOne
    @JoinColumn(name = "groupowner_id")
    public Customer groupOwner;

    public String groupName;

    @OneToMany(mappedBy = "gruppen")
    public List<Event> events;

}
