import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IEvent } from './../interface/event.interface';
import { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<IEvent>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  // function to post an event
  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    // save the given event in a local variable
    const newEvent = await new this.eventModel(createEventDto);
    let invalidInputs = [];
    // get the actual date
    const actualDate = new Date;
    // check eventname
    if (newEvent.eventname.length == 0) {
      invalidInputs.push("Eventname");
    }
    // check location
    if (newEvent.location.length == 0) {
      invalidInputs.push("Event Location");
    }
    // check if startdate is after the actual date
    if (newEvent.startdate < actualDate) {
      invalidInputs.push("Startdatum");
    }
    // check beschreibung
    if (newEvent.beschreibung.length == 0) {
      invalidInputs.push("Beschreibung");
    }
    // check kategorie
    if (newEvent.kategorie.length == 0) {
      invalidInputs.push("Kategorie");
    }
    // check if event is public and has a ticketprice
    if (newEvent.isPublic && newEvent.ticketpreis <= 0) {
      invalidInputs.push("Ticketpreis");
    }
    // check if enddate is given
    if(newEvent.enddate) {
      // check if enddate is after the startdate
      if (newEvent.enddate < newEvent.startdate) {
        invalidInputs.push("Enddatum darf nicht vor Startdatum sein");
      }
    }

    // if there is no error save the event
    if(invalidInputs.length == 0) {
      return newEvent.save();
      // if there was an error
    } else {
      // build the error message
      let errorMessage = "Folgende Eingaben sind nicht valid: ";
      for(let i = 0; i < invalidInputs.length; i++) {
        if(i+1 == invalidInputs.length) {
          errorMessage += invalidInputs[i];
        } else {
          errorMessage += invalidInputs[i] + ", ";
        }
      }
      invalidInputs = [];
      // throw the error to show it in the frontend
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN)
    }
  }

  // function to get all events
  async getAllEvents(): Promise<IEvent[]> {
    const eventData = await this.eventModel
      .find()
      // populate the owner with the userModel in order to get the whole user infos in the return and not only the id
      .populate('owner','',this.userModel)
      .populate('participants','',this.userModel)
      .exec();
    // if no data is found throw an error
    if (!eventData || eventData.length == 0) {
      throw new NotFoundException('Event data not found!');
    }
    // return the found events
    return eventData;
  }

  // function to update the event
  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<IEvent> {
    // get the event and then update it
    const existingEvent = await this.eventModel.findByIdAndUpdate(
      eventId,
      updateEventDto,
      { new: true },
    );
    // if there is no event with the following id throw an error
    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    // return the updated event
    return existingEvent;
  }

  // function to get event by id
  async getEvent(eventId: string): Promise<IEvent> {
    // get event by id which is given
    const existingEvent = await this.eventModel.findById(eventId).exec();
    // if no data found throw an error
    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    // return the event
    return existingEvent;
  }

  // function to delete 1 event
  async deleteEvent(eventId: string): Promise<IEvent> {
    // get the id by id and then delete
    const deletedEvent = await this.eventModel.findByIdAndDelete(eventId);
    // if no data found throw an error
    if (!deletedEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    // return the deleted event
    return deletedEvent;
  }

  // function to get event by id
  async getEventById(eventId: string): Promise<IEvent> {
    // get event by the given id
    const existingEvent = await this.eventModel
      .findById(eventId)
      // populate the owner with the userModel in order to get all the user infos and not only the id
      .populate('owner', '', this.userModel)
      .populate('participants','',this.userModel)
      .exec();
      // if not data found throw an error
    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    // return the event
    return existingEvent;
  }
}
