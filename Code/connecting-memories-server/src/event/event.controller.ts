import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Request to push the event
  @Post()
  async createEvent(@Res() response, @Body() createEventDto: CreateEventDto) {
    // send the event which comes from the backend to the service
    const newEvent = await this.eventService.createEvent(createEventDto);
    return response.status(HttpStatus.CREATED).json({
      newEvent,
    });
  }

  // request to get all the events
  @Get()
  async getEvents(@Res() response) {
    try {
      // call the function in the service to get all events
      const eventData = await this.eventService.getAllEvents();
      return response.status(HttpStatus.OK).json({
        eventData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // request to update 1 event with the given id and the given data
  @Put('/:id')
  async updateEvent(
    @Res() response,
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    // call the function in the service and give the eventid and the new data
    try {
      const existingEvent = await this.eventService.updateEvent(
        eventId,
        updateEventDto,
      );
      // return that it went well
      return response.status(HttpStatus.OK).json({
        existingEvent,
      });
      // throw an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // delete 1 event with the given id
  @Delete('/:id')
  async deleteEvent(@Res() response, @Param('id') eventId: string) {
    // call the funciton and give the id to delete the event
    try {
      const deletedEvent = await this.eventService.deleteEvent(eventId);
      // return that the event was deleted
      return response.status(HttpStatus.OK).json({
        deletedEvent,
      });
      // return an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // request to get 1 event with the given id
  @Get('/:id')
  async getEventById(@Res() response, @Param('id') eventId: string) {
    // call the funciton in the service and give the id
    try {
      const existingEvent = await this.eventService.getEventById(eventId);
      // return that all went well
      return response.status(HttpStatus.OK).json({
        existingEvent,
      });
      // return an error
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
