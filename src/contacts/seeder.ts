import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import { ContactSeeder } from './contacts.seeder';
import { Contact, ContactSchema } from './entities/contact.entity';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jerome:GJAv1wM3dTiqTZie@cluster0.ouzmu.mongodb.net/Phonebook?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
}).run([ContactSeeder]);
