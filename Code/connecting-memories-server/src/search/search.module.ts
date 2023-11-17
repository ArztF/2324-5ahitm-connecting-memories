import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EventSchema } from 'src/schema/event.schema';
import { EventService } from 'src/event/event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  providers: [SearchService, EventService],
  controllers: [SearchController],
})
export class SearchModule {}
