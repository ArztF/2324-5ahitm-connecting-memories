package com.example.repository;

import com.example.model.Customer;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@ApplicationScoped
public class CustomerRepository implements PanacheRepository<Customer> {
    @Inject
    EntityManager em;

    public Customer findByEmail(String email) {
        String jpql = "Select c from Customer c where c.email =: email";
        TypedQuery<Customer> query = em.createQuery(jpql,Customer.class);
        query.setParameter("email",email);
        return query.getSingleResult();
    }
}
