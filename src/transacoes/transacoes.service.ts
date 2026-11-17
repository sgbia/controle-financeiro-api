
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Transacao } from './schemas/transacao.schema.js';
import { CriarTransacaoDto } from './dto/criar-transacao.dto.js';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async criar(dados: CriarTransacaoDto) {
    const novaTransacao = new this.transacaoModel(dados);
    return await novaTransacao.save();
  }

  async listarComMetricas() {
    const historico = await this.transacaoModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    let saldoTotal = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    historico.forEach((transacao) => {
      if (transacao.tipo === 'receita') {
        saldoTotal += transacao.valor;
      }

      if (transacao.tipo === 'despesa') {
        saldoTotal -= transacao.valor;
        totalDespesas += transacao.valor;

        if (transacao.consumoConsciente === false) {
          totalGastoImpulso += transacao.valor;
        }
      }
    });

    const arredondar = (valor: number) =>
      Math.round((valor + Number.EPSILON) * 100) / 100;

    return {
      historico,
      metricas: {
        saldoTotal: arredondar(saldoTotal),
        totalDespesas: arredondar(totalDespesas),
        totalGastoImpulso: arredondar(totalGastoImpulso),
      },
    };
  }
}
