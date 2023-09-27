import { Test, TestingModule } from '@nestjs/testing';
import { ParckedCarController } from './parcked-car.controller';

describe('ParckedCarController', () => {
  let controller: ParckedCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParckedCarController],
    }).compile();

    controller = module.get<ParckedCarController>(ParckedCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
