import { formatISO } from "date-fns";

type PackageInput = {
  id?: string | number;
  code?: string;
  scanned_at?: string | Date;
  created_at?: string | Date;
  status?: string;
  delivery_status?: string;
};

export function createPackage(input?: PackageInput) {
  const now = formatISO(new Date()); 

  return {
    id: input?.id ?? undefined,
    code: input?.code ?? "",
    scanned_at: input?.scanned_at
      ? formatISO(new Date(input.scanned_at))
      : now,
    created_at: input?.created_at
      ? formatISO(new Date(input.created_at))
      : now,
    status: input?.status ?? "Coletado",
    delivery_status: input?.delivery_status ?? "pending",
  };
}
