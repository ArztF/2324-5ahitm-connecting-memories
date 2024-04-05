package com.example.resource;

import com.example.model.Customer;
import com.example.repository.CustomerRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;
import com.example.dtos.LoginUserDto;

import java.net.URI;
import java.util.List;

@Path("api/user/")
public class CustomerResource {
    @Inject
    CustomerRepository customerRepository;


    @Transactional
    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    public URI createUser(Customer customer, @Context UriInfo uriInfo) {
        customerRepository.createUser(customer);
        return uriInfo.getAbsolutePathBuilder().path(Long.toString(customer.id)).build(customer.id);
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Long loginUser(LoginUserDto loginData) {
        System.out.println(loginData.email);
        Long test = customerRepository.loginUser(loginData);
        System.out.println("res: " + test);
        return test;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Customer> getCustomers() {
        return customerRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Customer getCustomerById(@PathParam("id") Long id) {
        return customerRepository.findById(id);
    }

    @GET
    @Path("/email/{email}")
    public Customer getCustomerByEmail(@PathParam("email") String email) {
        return customerRepository.findByEmail(email);
    }

    @POST
    @Transactional
    public Customer createCustomer(Customer customer) {
        customerRepository.persist(customer);
        return customer;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Customer updateCustomer(@PathParam("id") Long id, Customer updatedCustomer) {
        Customer customer = customerRepository.findById(id);
        if (customer != null) {
            // Update user fields as needed
            customer.vorname = updatedCustomer.vorname;
            customer.nachname = updatedCustomer.nachname;
            customer.email = updatedCustomer.email;
            customer.username = updatedCustomer.username;
            customer.password = updatedCustomer.password;
            customer.isVeranstalter = updatedCustomer.isVeranstalter;
            customer.geburtsdatum = updatedCustomer.geburtsdatum;
            
            customerRepository.persist(customer);
        }
        return customer;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteUser(@PathParam("id") Long id) {
        customerRepository.deleteById(id);
    }

}
