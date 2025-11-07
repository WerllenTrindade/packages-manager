import { UserTypes } from "@/types/user";
import { useSQLiteContext } from "expo-sqlite";

export function useAuthDatabase() {
  const { runAsync, getFirstAsync } = useSQLiteContext();

  async function dbLogin(email: string, password: string): Promise<boolean> {
    try {
      const existingUser = await getFirstAsync<UserTypes>(
        'SELECT id, email, password FROM users WHERE email = ?',
        [email]
      );

      if (existingUser) {
        if (existingUser.password !== password) {
          await runAsync(
            'UPDATE users SET password = ? WHERE email = ?',
            [password, email]
          );
          console.log("Senha atualizada com sucesso.");
        }
        
        return true;
        
      } else {
        await runAsync(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, password]
        );
        
        const newUser = await getFirstAsync<UserTypes>(
          'SELECT id, email FROM users WHERE email = ?',
          [email]
        );

        if (newUser) {
          console.log("Usuário cadastrado e logado com sucesso.");
          return true;
        }

        return false;
      }
    } catch (error: any) {
      console.error("Erro fatal no processo de credenciais de usuário:", error.message);
      return false; 
    }
  }

  return { dbLogin };
}