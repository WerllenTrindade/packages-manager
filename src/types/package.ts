


export interface PackageTypes {
  id: number;
  code: string;
  status: 'Coletado' | 'Em rota de entrega' | 'Entregue';
  delivery_status: 'pending' | 'sent';
  client_name?: string | null;
  scanned_at: string;
  sent_at?: string | null;
  created_at: string;
}
