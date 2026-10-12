import { Test, TestingModule } from '@nestjs/testing';
import { SuhuService } from './suhu.service.js';

describe('SuhuService', () => {
  let service: SuhuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuhuService],
    }).compile();

    service = module.get<SuhuService>(SuhuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
