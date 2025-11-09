import { type SQLiteDatabase } from "expo-sqlite";

export async function db(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      status TEXT CHECK(status IN ('Coletado', 'Em rota de entrega', 'Entregue')) DEFAULT 'Coletado',
      delivery_status TEXT CHECK(delivery_status IN ('pending', 'sent')) DEFAULT 'pending',
      client_name TEXT,
      scanned_at DATETIME NOT NULL,
      sent_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sync_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER NOT NULL,
      retries INTEGER DEFAULT 0,
      last_attempt_at DATETIME,
      FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_packages_code ON packages (code);
    CREATE INDEX IF NOT EXISTS idx_packages_status ON packages (status);
    CREATE INDEX IF NOT EXISTS idx_packages_delivery_status ON packages (delivery_status);
  `);

  const result = await database.getFirstAsync<{ count: number }>("SELECT COUNT(*) as count FROM packages;");
  
  if (result?.count === 0) {
    console.log("🔹 Banco vazio, inserindo pacotes de exemplo...");

    const now = new Date().toISOString();

    const mockPackages = [
      { code: "PKG001", status: "Coletado", delivery_status: "sent", client_name: "João Silva", scanned_at: now },
      { code: "PKG002", status: "Coletado", delivery_status: "pending", client_name: "Maria Souza", scanned_at: now },
      { code: "PKG003", status: "Em rota de entrega", delivery_status: "sent", client_name: "Carlos Lima", scanned_at: now },
      { code: "PKG004", status: "Em rota de entrega", delivery_status: "pending", client_name: "Ana Paula", scanned_at: now },
      { code: "PKG005", status: "Entregue", delivery_status: "sent", client_name: "Pedro Sapackages.scanned_attos", scanned_at: now },
      { code: "PKG006", status: "Entregue", delivery_status: "pending", client_name: "Fernanda Costa", scanned_at: now },
    ];

    for (const pkg of mockPackages) {
      await database.runAsync(
        `INSERT INTO packages (code, status, delivery_status, client_name, scanned_at)
         VALUES (?, ?, ?, ?, ?)`,
        [pkg.code, pkg.status, pkg.delivery_status, pkg.client_name, pkg.scanned_at]
      );
    }

    console.log("✅ Pacotes mockados inseridos com sucesso.");
  } else {
    console.log(`📦 Banco já contém ${result?.count} pacotes.`);
  }
}
