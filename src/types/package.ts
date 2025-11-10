export type PackageStatus = 'Coletado' | 'Em rota de entrega' | 'Entregue';
export type DeliveryStatus = 'pending' | 'sent';

export interface PackageTypes {
  id: number;
  code: string;
  status: PackageStatus;
  delivery_status: DeliveryStatus;
  client_name?: string | null;
  scanned_at: string;
  sent_at?: string | null;
  created_at: string;
}

export interface WebhookPayload {
  code: string;
  clientName?: string;
  status: PackageStatus;
  deliveryStatus: DeliveryStatus;
  scanned_at?: string;
}

export interface StatusOption {
  label: string;
  value: PackageStatus;
}


export type SyncResult = { packageId: number; sent: boolean };