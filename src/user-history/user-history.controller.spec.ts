import { Test, TestingModule } from '@nestjs/testing';
import { UserHistoryController } from './user-history.controller';

describe('UserHistoryController', () => {
  let controller: UserHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHistoryController],
    }).compile();

    controller = module.get<UserHistoryController>(UserHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
