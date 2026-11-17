
import {
  IsString,
  IsNumber,
  IsIn,
  IsBoolean,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CriarTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  valor: number;

  @IsIn(['receita', 'despesa'])
  tipo: 'receita' | 'despesa';

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;
}
