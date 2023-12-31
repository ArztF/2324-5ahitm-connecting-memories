package com.example.resource;


import com.example.dtos.ImageUploadForm;
import com.example.model.Image;
import com.example.repository.ImageRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.MultipartForm;

@Path("/image")
public class ImageRessource {
    @Inject
    ImageRepository imageRepository;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Long uploadImage(
            @MultipartForm ImageUploadForm form) {
        Image imageEntity = new Image();
        imageEntity.imageName = form.name;
        imageEntity.imageData = form.data;

        imageEntity.persist();

       return imageEntity.id;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public byte[] getImage(@PathParam("id") Long id) {
        Image image = imageRepository.findById(id);
        return image.imageData;
    }
}
