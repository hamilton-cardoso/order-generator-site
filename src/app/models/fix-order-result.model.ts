export interface FixOrderResult {
    status: 'ACEITA' | 'REJEITADA' | 'ERRO';
    detail?: string;
  }
  