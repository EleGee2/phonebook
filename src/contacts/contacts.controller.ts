import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('api/v1/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll(@Query() query) {
    let options = {};

    if (query.search) {
      options = {
        $or: [
          { fname: new RegExp(query.search.toString(), 'i') },
          { fname: new RegExp(query.search.toString(), 'i') },
          { email: new RegExp(query.search.toString(), 'i') },
          { phone: new RegExp(query.search.toString(), 'i') },
        ],
      };
    }

    const contacts = this.contactsService.findAll(options);

    if (query.dateFrom && query.dateTo) {
      const dateFrom = new Date(query.dateFrom);
      const dateTo = new Date(query.dateTo);

      contacts.find({ createdAt: { $gte: dateFrom, $lt: dateTo } });
    }

    const page: number = parseInt(query.page as any) || 1;
    const limit = (query.limit as number) || 6;
    const total = await this.contactsService.count(options);

    const data = await contacts
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
