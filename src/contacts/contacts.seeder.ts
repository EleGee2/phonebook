/* eslint-disable prettier/prettier */
import { DataFactory, Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Contact, ContactDocument } from './entities/contact.entity';

export class ContactSeeder implements Seeder {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>) {}

  seed(): Promise<any> {
    const contacts:any = DataFactory.createForClass(Contact).generate(50)

    return this.contactModel.insertMany(contacts);
  }
  drop(): Promise<any> {
    return this.contactModel.deleteMany({}) as any
  }
}
