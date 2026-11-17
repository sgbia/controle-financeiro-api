
import { Controller, Get, Post, Body } from '@nestjs/common';

import { TransacoesService } from './transacoes.service.js';
import { CriarTransacaoDto } from './dto/criar-transacao.dto.js';

@Controller('transacoes')
export class TransacoesController {
  constructor(
    private readonly transacoesService: TransacoesService,
  ) {}

  @Post()
  async criar(@Body() dados: CriarTransacaoDto) {
    return await this.transacoesService.criar(dados);
  }

  @Get()
  async listar() {
    return await this.transacoesService.listarComMetricas();
  }
}
