package com.example.repository;

import com.example.model.GroupParticipant;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class GroupParticipantRepository implements PanacheRepository<GroupParticipant> {

    public List<GroupParticipant> customerByCustomer(Long id) {
        TypedQuery<GroupParticipant> query = getEntityManager().createQuery(
                "select gp from GroupParticipant gp where gp.customer.id = :id", GroupParticipant.class
        );
        query.setParameter("id", id);

        return query.getResultList();
    }
}
