import { Test, TestingModule } from '@nestjs/testing';
import { AvaliaçãoController } from './avaliação.controller';
import { AvaliaçãoService } from './avaliação.service';

describe('AvaliaçãoController', () => {
  let controller: AvaliaçãoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliaçãoController],
      providers: [AvaliaçãoService],
    }).compile();

    controller = module.get<AvaliaçãoController>(AvaliaçãoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
