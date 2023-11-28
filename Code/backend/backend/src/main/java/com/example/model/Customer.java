package com.example.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "app_user")
public class Customer extends PanacheEntity {
    public String vorname;
    public String nachname;
    public String username;
    public String email;
    public String password;
    public Date geburtsdatum;
    public Boolean isVeranstalter;

    @OneToMany(mappedBy = "customer")
    public List<Participants> favouriteEvents;
}
