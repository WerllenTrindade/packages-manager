import api from "@/services/api";
import { PackageTypes, WebhookPayload } from "@/types/package";

export async function sendPackageToWebhook(pkg: PackageTypes): Promise<boolean> {
  const payload: WebhookPayload = {
    code: pkg.code,
    ...(pkg.client_name && { clientName: pkg.client_name }),
    status: pkg.status,
    deliveryStatus: 'sent',
    scanned_at: pkg.scanned_at,
  };

  try {
    const response = await api.post("/", payload);

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro ao enviar para webhook:", error);
    return false;
  }
}
