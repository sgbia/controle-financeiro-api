
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransacaoDocument = HydratedDocument<Transacao>;

@Schema({
  timestamps: true,
  collection: 'transacoes',
})
export class Transacao {
  @Prop({
    required: true,
    type: String,
  })
  descricao: string;

  @Prop({
    required: true,
    type: Number,
    min: 0,
  })
  valor: number;

  @Prop({
    required: true,
    type: String,
    enum: ['receita', 'despesa'],
  })
  tipo: string;

  @Prop({
    required: true,
    type: String,
  })
  categoria: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  consumoConsciente: boolean;
}

export const TransacaoSchema =
  SchemaFactory.createForClass(Transacao);
