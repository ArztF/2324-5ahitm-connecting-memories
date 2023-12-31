package com.example.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Event extends PanacheEntity {
    public String eventname;
    public String location;
    public String locationcords;
    @OneToOne
    public Image bannerimg;
    public Date startdate;
    public Date enddate;
    public String beschreibung;
    public String kategorie;
    public String veranstalter;
    public Long ticketpreis;
    public Boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    public Customer owner;

    @ManyToOne
    @JoinColumn(name = "group_id")
    public EventGroup eventGroup;

}
