export const packagesMock = [
  {
    id: "PKG001",
    recipient: "João Silva",
    address: "Rua das Flores, 120 - São Paulo/SP",
    createdAt: "2025-11-06T10:00:00Z",
    updatedAt: "2025-11-06T10:00:00Z",
    status: "pendente", // aguardando coleta
  },
  {
    id: "PKG002",
    recipient: "Maria Oliveira",
    address: "Av. Paulista, 900 - São Paulo/SP",
    createdAt: "2025-11-06T09:00:00Z",
    updatedAt: "2025-11-06T11:30:00Z",
    status: "em_transporte", // saiu para entrega
  },
  {
    id: "PKG003",
    recipient: "Carlos Souza",
    address: "Rua Bela Vista, 45 - Rio de Janeiro/RJ",
    createdAt: "2025-11-05T08:45:00Z",
    updatedAt: "2025-11-05T13:00:00Z",
    status: "entregue", // entregue com sucesso
  },
  {
    id: "PKG004",
    recipient: "Fernanda Lima",
    address: "Rua dos Pinheiros, 78 - São Paulo/SP",
    createdAt: "2025-11-06T07:20:00Z",
    updatedAt: "2025-11-06T12:15:00Z",
    status: "cancelado", // cancelado antes da entrega
  },
  {
    id: "PKG005",
    recipient: "Rafael Santos",
    address: "Av. Atlântica, 500 - Rio de Janeiro/RJ",
    createdAt: "2025-11-04T15:30:00Z",
    updatedAt: "2025-11-06T08:10:00Z",
    status: "falha_entrega", // tentativa de entrega frustrada
  },
  {
    id: "PKG006",
    recipient: "Ana Costa",
    address: "Rua do Comércio, 300 - Belo Horizonte/MG",
    createdAt: "2025-11-03T14:00:00Z",
    updatedAt: "2025-11-06T10:45:00Z",
    status: "aguardando_retirada", // pronto para retirada no ponto
  },
];
