import { Model } from 'mongoose';
import { HttpException, Injectable, HttpStatus, Catch } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Catch()
@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    try {
      const createdContact = new this.contactModel(createContactDto);
      const result = await createdContact.save();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  findAll(options) {
    try {
      return this.contactModel.find(options);
      // return contacts.map((contact) => ({
      //   id: contact.id,
      //   fname: contact.fname,
      //   lname: contact.lname,
      //   email: contact.email,
      //   phone: contact.phone,
      // }));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findOne(id: string) {
    try {
      const contact = await this.contactModel.findById(id);

      if (!contact) {
        return 'Does not exists';
      }
      return {
        id: contact.id,
        fname: contact.fname,
        lname: contact.lname,
        email: contact.email,
        phone: contact.phone,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    try {
      const updatedContact = this.contactModel.findByIdAndUpdate(
        id,
        updateContactDto,
      );

      if (!updatedContact) {
        throw new HttpException({ status: 404, error: 'Not found' }, 404);
      }
      const result = updatedContact.exec();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  remove(id: string) {
    try {
      const contact = this.contactModel.findByIdAndDelete({ id });
      contact.exec();
      return 'Deleted Successfully';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  count(options) {
    return this.contactModel.count(options).exec();
  }
}
