import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoDTO } from './dto/avaliacao.dto';
import { UpdateAvaliacaoDTO } from './dto/update-avaliacao.dto';


//o controlador lida com as requisições http
@Controller('avaliacao')
export class AvaliacaoController{
  constructor(private readonly avaliacaoService: AvaliacaoService){}

  @Post()
  async create(@Body() avaliacaoDTO: AvaliacaoDTO){
    return this.avaliacaoService.create(avaliacaoDTO);
  }

  @Get()
  async findAll(){
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.avaliacaoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAvaliacaoDTO: UpdateAvaliacaoDTO){
    return this.avaliacaoService.update(+id, updateAvaliacaoDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string){
    return this.avaliacaoService.remove(+id);
  }
  

}
