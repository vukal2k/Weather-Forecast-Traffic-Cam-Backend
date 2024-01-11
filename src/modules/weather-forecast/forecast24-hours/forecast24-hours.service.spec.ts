import { Test, TestingModule } from '@nestjs/testing';
import { Forecast24HoursService } from './forecast24-hours.service';

describe('Forecast24HoursService', () => {
  let service: Forecast24HoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Forecast24HoursService],
    }).compile();

    service = module.get<Forecast24HoursService>(Forecast24HoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
