import { Test } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService],
    }).compile();

    controller = moduleRef.get<ContactsController>(ContactsController);
    service = moduleRef.get<ContactsService>(ContactsService);
  });

  describe('getContacts', () => {
    it('should return an array of contacts', async () => {});
  });
});
