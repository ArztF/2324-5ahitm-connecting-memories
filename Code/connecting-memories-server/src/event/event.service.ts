import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import moment from 'moment';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IEvent } from './../interface/event.interface';
import { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';
import { EventDto } from 'src/search/search.dto';
@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<IEvent>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    const newEvent = await new this.eventModel(createEventDto);
    let invalidInputs = [];

    const actualDate = new Date();

    if (newEvent.eventname.length == 0) {
      invalidInputs.push('Eventname');
    }

    if (newEvent.location.length == 0) {
      invalidInputs.push('Event Location');
    }

    if (newEvent.startdate < actualDate) {
      invalidInputs.push('Startdatum');
    }

    if (newEvent.beschreibung.length == 0) {
      invalidInputs.push('Beschreibung');
    }

    if (newEvent.kategorie.length == 0) {
      invalidInputs.push('Kategorie');
    }

    if (newEvent.isPublic && newEvent.ticketpreis <= 0) {
      invalidInputs.push('Ticketpreis');
    }

    if (newEvent.enddate) {
      if (newEvent.enddate < newEvent.startdate) {
        invalidInputs.push('Enddatum darf nicht vor Startdatum sein');
      }
    }

    if (invalidInputs.length == 0) {
      return newEvent.save();
    } else {
      let errorMessage = 'Folgende Eingaben sind nicht valid: ';
      for (let i = 0; i < invalidInputs.length; i++) {
        if (i + 1 == invalidInputs.length) {
          errorMessage += invalidInputs[i];
        } else {
          errorMessage += invalidInputs[i] + ', ';
        }
      }
      invalidInputs = [];

      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }
  }

  async getAllEvents(): Promise<IEvent[]> {
    const eventData = await this.eventModel
      .find()

      .populate('owner', '', this.userModel)
      .populate('participants', '', this.userModel)
      .exec();

    if (!eventData || eventData.length == 0) {
      throw new NotFoundException('Event data not found!');
    }

    return eventData;
  }

  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<IEvent> {
    const existingEvent = await this.eventModel.findByIdAndUpdate(
      eventId,
      updateEventDto,
      { new: true },
    );

    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }

    return existingEvent;
  }

  async getEvent(eventId: string): Promise<IEvent> {
    const existingEvent = await this.eventModel.findById(eventId).exec();

    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }

    return existingEvent;
  }

  async deleteEvent(eventId: string): Promise<IEvent> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }

    return deletedEvent;
  }

  async getEventById(eventId: string): Promise<IEvent> {
    const existingEvent = await this.eventModel
      .findById(eventId)

      .populate('owner', '', this.userModel)
      .populate('participants', '', this.userModel)
      .exec();

    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }

    return existingEvent;
  }

  async findAllRestaurantsWithMeals(): Promise<EventDto[]> {
    const existingEvent = await this.eventModel.find().exec();

    const rest: EventDto[] = [];

    existingEvent.forEach((element) => {
      rest.push(this._getEventDetails(element));
    });

    return rest;
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
  }

  _getEventDetails(event: IEvent): EventDto {
    return {
      id: event._id,
      eventname: event.eventname,
      location: event.location,
      startdate: this.formatDate(event.startdate),
      enddate: this.formatDate(event.enddate),
      category: event.kategorie,
      
    };
  }
}
