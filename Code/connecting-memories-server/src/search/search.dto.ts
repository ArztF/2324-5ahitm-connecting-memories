export class DataSet {
  indexName: string;
  events: EventDto[];
}

export class EventDto {
  id: string;
  eventname: string;
  category: string;
  startdate: string;
  enddate: string;
  location: string;
}

export class DeleteInput {
  indexName: string;
  id?: string;
}

export class searchByKeyword {
  keyword: string;
}
