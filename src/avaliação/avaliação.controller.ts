import { Controller } from '@nestjs/common';
import { AvaliaçãoService } from './avaliação.service';

@Controller('avaliação')
export class AvaliaçãoController {
  constructor(private readonly avaliaçãoService: AvaliaçãoService) {}
}
