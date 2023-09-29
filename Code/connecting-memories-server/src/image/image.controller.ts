import { Controller, Post, UseInterceptors, UploadedFile, Res, Req, Body, HttpStatus, Get, Param, NotFoundException, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {

    constructor(private imageService: ImageService) { }

    // request to post an image
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file, @Res() res, @Req() req, @Body() body) {
        // call the function to create the file
        const image = await this.imageService.create(file, body);
        // cast the image to an Object which is valid in the db
        const newImage = image.toObject();

        // create the new image path where it si saved
        const host = req.get('host');
        newImage.image_file = undefined;
        newImage.url = `http://${host}/image/${newImage._id}`;

        // push the image in the db
        return res.send(newImage)._id;
    }

    // request to get all images
    @Get('')
    async getImages(@Req() req) {
        // build the url where all the images are saved
        const host = req.get('host');
        // send a request to the db
        const images = await this.imageService.findAll();

        // iterate the all the images and save the url for all the images
        images.forEach(image => {
            image.url = `http://${host}/image/${image._id}`;
        });

        // return all images
        return images;
    }

    // request to get one image by id
    @Get(':id')
    async getImage(@Res() res, @Body() body, @Param('id') id) {
        // call the function in the service and give the id further
        const image = await this.imageService.getById(id);
        // if no image found throw an error
        if (!image) throw new NotFoundException('Image does not exist!');
        // build the image header
        res.setHeader('Content-Type', image.image_file.contentType);
        return res.send(image.image_file.data.buffer);
    }

    // request to delete one image
    @Delete(':id')
    async deleteImage(@Res() res, @Body() body, @Param('id') id) {
        // call the function in the service and send the given id
        const image = await this.imageService.removeImage(id);
        // if no image is found throw an error
        if (!image) throw new NotFoundException('Image does not exist!');
        // return that the image was deleted successfully
        return res.status(HttpStatus.OK).json({msg: 'Image removed.'});
    }
}