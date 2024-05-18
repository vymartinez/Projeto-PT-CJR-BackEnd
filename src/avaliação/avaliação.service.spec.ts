import { Test, TestingModule } from '@nestjs/testing';
import { AvaliaçãoService } from './avaliação.service';

describe('AvaliaçãoService', () => {
  let service: AvaliaçãoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvaliaçãoService],
    }).compile();

    service = module.get<AvaliaçãoService>(AvaliaçãoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
