import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Factory((faker) => faker.name.firstName())
  @Prop({ required: true })
  fname: string;

  @Factory((faker) => faker.name.lastName())
  @Prop({ required: true })
  lname: string;

  @Factory((faker) => faker.internet.email())
  @Prop({ required: true, unique: true })
  email: string;

  @Factory((faker) => faker.phone.phoneNumber())
  @Prop({ required: true })
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
