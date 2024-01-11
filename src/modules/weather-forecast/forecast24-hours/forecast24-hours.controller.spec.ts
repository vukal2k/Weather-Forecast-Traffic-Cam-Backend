import { Test, TestingModule } from '@nestjs/testing';
import { Forecast24HoursController } from './forecast24-hours.controller';

describe('Forecast24HoursController', () => {
  let controller: Forecast24HoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Forecast24HoursController],
    }).compile();

    controller = module.get<Forecast24HoursController>(
      Forecast24HoursController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
