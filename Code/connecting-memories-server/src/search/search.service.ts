import { Injectable } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { DataSet, DeleteInput, searchByKeyword } from './search.dto';
import { EventService } from 'src/event/event.service';

@Injectable()
export class SearchService {
  private readonly openSearchClient: Client;

  constructor(private readonly eventService: EventService) {
    // Initialize the OpenSearch client with your configuration
    this.openSearchClient = new Client({
      node: 'https://localhost:9200',
      ssl: {
        rejectUnauthorized: false,
      },
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });

    this.loadDataIntoIndex();
  }

  async loadDataIntoIndex() {
    await this.openSearchClient.deleteByQuery({
      index: 'search_index',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    const res = await this.eventService.findAllEvents();
    if (res.length == 0) {
      return;
    }
    console.log('test');

    await this.bulkDataIngestion({
      indexName: 'search_index',
      events: res,
    });
  }

  async bulkDataIngestion(input: DataSet): Promise<any> {
    const body = input.events.flatMap((doc) => {
      return [{ index: { _index: input.indexName, _id: doc.id } }, doc];
    });

    try {
      const res = await this.openSearchClient.bulk({ body });
      return res.body;
    } catch (err) {
      return {
        httpCode: 500,
        error: err,
      };
    }
  }

  async singleDataIngestion(input: DataSet): Promise<any> {
    const events = input.events[0];

    try {
      const res = await this.openSearchClient.index({
        id: events.id,
        index: input.indexName,
        body: {
          id: events.id,
          name: events.eventname,
        },
      });
      return res.body;
    } catch (err) {
      return {
        httpCode: 500,
        error: err,
      };
    }
  }

  async searchByKeyword(input: searchByKeyword): Promise<any> {
    const body = {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: input.keyword,
                fields: ['eventname'],
                slop: 1,
              },
            },
            {
              multi_match: {
                query: input.keyword,
                fields: ['startdate'],
                slop: 1,
              },
            },
            {
              multi_match: {
                query: input.keyword,
                fields: ['enddate'],
                slop: 1,
              },
            },
            {
              multi_match: {
                query: input.keyword,
                fields: ['category'],
                slop: 1,
              },
            },
            {
              multi_match: {
                query: input.keyword,
                fields: ['location'],
                slop: 1,
              },
            },
          ],
          minimum_should_match: 1,
        },
      },
    };

    try {
      const res = await this.openSearchClient.search({
        index: 'search_index',
        body,
      });
      if (res.body.hits.total.value == 0) {
        return {
          httpCode: 200,
          data: [],
          message: `No Data found based based on Keyword: ${input.keyword}`,
        };
      }
      const result = res.body.hits.hits.map((item) => {
        return item._source;
      });

      return result;
    } catch (error) {
      return {
        httpCode: 500,
        data: [],
        error: error,
      };
    }
  }

  async purgeIndex(input: DeleteInput): Promise<any> {
    try {
      await this.openSearchClient.indices.delete({
        index: input.indexName,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async purgeDocumentById(input: DeleteInput): Promise<any> {
    try {
      if (input.id != null && input.indexName != null) {
        await this.openSearchClient.delete({
          index: input.indexName,
          id: input.id,
        });
      } else {
        return {
          httpCode: 200,
          message: `indexName or document id is missing`,
        };
      }

      return {
        httpCode: 200,
        message: `Record deleted having index: ${input.indexName}, id: ${input.id}`,
      };
    } catch (error) {
      return {
        httpCode: 500,
        message: error,
      };
    }
  }
}
