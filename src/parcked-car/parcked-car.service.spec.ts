import { Test, TestingModule } from '@nestjs/testing';
import { ParckedCarService } from './parcked-car.service';

describe('ParckedCarService', () => {
  let service: ParckedCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParckedCarService],
    }).compile();

    service = module.get<ParckedCarService>(ParckedCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
