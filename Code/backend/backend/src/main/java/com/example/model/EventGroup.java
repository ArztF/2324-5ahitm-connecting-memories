package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class EventGroup extends PanacheEntity {
    public String groupName;
    public String description;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    public Customer groupAdmin;

    @OneToOne
    public Image image;

    @OneToMany(mappedBy = "eventGroup")
    @JsonIgnore
    public List<GroupParticipant> groupParticipants;

}
