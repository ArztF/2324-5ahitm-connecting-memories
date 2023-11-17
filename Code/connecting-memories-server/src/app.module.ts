import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ImageModule } from './image/image.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admindb:swwfMeibDl2tfFWw@cluster0.nfensrs.mongodb.net/?retryWrites=true&w=majority',
    ),
    ImageModule,
    EventModule,
    UserModule,
    JwtModule,
    AuthModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
