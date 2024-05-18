import { Controller } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}
}
