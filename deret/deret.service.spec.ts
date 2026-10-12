import { Test, TestingModule } from '@nestjs/testing';
import { DeretService } from './deret.service.js';

describe('DeretService', () => {
  let service: DeretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeretService],
    }).compile();

    service = module.get<DeretService>(DeretService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
