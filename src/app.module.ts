import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forRoot(
      'mongodb+srv://jerome:GJAv1wM3dTiqTZie@cluster0.ouzmu.mongodb.net/Phonebook?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
