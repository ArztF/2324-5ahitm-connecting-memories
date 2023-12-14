package com.example.repository;

import com.example.model.Customer;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import com.example.dtos.LoginUserDto;
import org.bouncycastle.util.encoders.Hex;

@ApplicationScoped
public class CustomerRepository implements PanacheRepository<Customer> {
    @Inject
    EntityManager em;

    public void createUser(Customer user)  {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(
                    user.password.getBytes(StandardCharsets.UTF_8));
            String hashedPassword = new String(Hex.encode(hash));
            user.password= hashedPassword;
            persist(user);
        } catch (Exception e){
        }
    }

    public Long loginUser(LoginUserDto loginData) {
        Customer customer = find("email", loginData.email).firstResult();

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(
                    loginData.password.getBytes(StandardCharsets.UTF_8));
            String hashedPassword = new String(Hex.encode(hash));


            if (customer.password.equals(hashedPassword)){
                return customer.id;
            } else {
                return null;
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


    public Customer findByEmail(String email) {
        String jpql = "Select c from Customer c where c.email =: email";
        TypedQuery<Customer> query = em.createQuery(jpql,Customer.class);
        query.setParameter("email",email);
        return query.getSingleResult();
    }
}
