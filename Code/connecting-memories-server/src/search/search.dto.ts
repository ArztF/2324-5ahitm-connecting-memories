import { IEvent } from 'src/interface/event.interface';

export class DataSet {
  indexName: string;
  events: IEvent[];
}

export class EventDto {
  id: string;
  eventName: string;
  description: string;
  startdate: Date;
  enddate: Date;
  location: Location;
}

export class DeleteInput {
  indexName: string;
  id?: string;
}

export class searchByKeyword {
  keyword: string;
}
