import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGeocoderService } from './google-geocoder.service';

describe('GoogleGeocoderService', () => {
  let service: GoogleGeocoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleGeocoderService],
    }).compile();

    service = module.get<GoogleGeocoderService>(GoogleGeocoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
