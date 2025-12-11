import { Plano } from './plano.model';

export interface Beneficiario {
  id?: number;
  nome_completo: string;
  cpf: string;
  data_nascimento: string;
  status: 'ATIVO' | 'INATIVO';
  plano_id: number;
  data_cadastro?: string;
  plano?: Plano;
}