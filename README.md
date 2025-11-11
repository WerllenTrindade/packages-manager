# 📱 Projeto de Autenticação Offline com SQLite e Testes Unitários

Este projeto demonstra a implementação de um fluxo de autenticação com **persistência local (SQLite)** e **testes unitários completos** utilizando **Jest** e **Testing Library**, seguindo boas práticas de separação de responsabilidades entre *componentes*, *services* e *repositories*.

---

## 🧩 Estrutura do Projeto

```
src/
├── components/
│   └── Inputs/
│       └── InputForm/
│           ├── InputForm.tsx
│           └── __tests__/InputForm.test.tsx
│
├── repositories/
│   └── auth/
│       ├── authRepository.ts
│       └── __tests__/authRepository.test.ts
│
├── services/
│   └── authService.ts
│   └── __tests__/authService.test.ts
│
├── screens/
│   └── Login/
│       ├── LoginScreen.tsx
│       └── __tests__/Login.test.tsx
│
├── types/
│   └── user.ts
│
└── utils/
    └── (funções auxiliares e mocks)
```

---

## ⚙️ Tecnologias e Bibliotecas

| Categoria | Tecnologia |
|------------|-------------|
| Framework Mobile | **React Native (Expo)** |
| Linguagem | **TypeScript** |
| Banco Local | **Expo SQLite** |
| Testes Unitários | **Jest** + **@testing-library/react-native** |
| Mock de Módulos | **jest.mock**, **jest.fn()** |
| Linter | **ESLint + Prettier** |
| Navegação (opcional) | **@react-navigation/native** |

---

## 🚀 Como Rodar o Projeto

```bash
# Instalar dependências
npm install

# Rodar aplicação em ambiente de desenvolvimento
npx expo start
```

---

## 🧪 Executando os Testes

Os testes cobrem três camadas da aplicação: **componente**, **service** e **repository**.

```bash
# Executar todos os testes
npm test

# Executar apenas um teste específico
npm test src/repositories/auth/__tests__/authRepository.test.ts
```

---

## 🧠 O que foi Testado

### 🧩 Componentes (`InputForm`)
- Renderização correta do título e placeholder  
- Alteração de valor no input  
- Limpeza do campo com `clearable=true`  
- Alternância de `secureTextEntry` com botão de visibilidade  

### ⚙️ Services (`authService`)
- Chamada correta do repositório  
- Retorno esperado em sucesso e erro  
- Tratamento de exceções e propagação  

### 💾 Repository (`authRepository`)
- Retorna `true` quando usuário existe e senha confere  
- Atualiza senha quando diferente  
- Cria novo usuário quando não existe  
- Retorna `false` em caso de erro no banco  

---

## 📁 Exemplo de Teste (Repository)

```ts
it("retorna false quando ocorre erro", async () => {
  const { getFirstAsync } = useSQLiteContext();
  (getFirstAsync as jest.Mock).mockRejectedValue(new Error("DB error"));

  const { dbLogin } = useAuthDatabase();
  const response = await dbLogin("test@example.com", "1234");

  expect(response).toBe(false);
  expect(console.error).toHaveBeenCalledWith(
    "Erro fatal no processo de credenciais de usuário:",
    "DB error"
  );
});
```

---

## 📋 Cobertura de Testes (Resumo)

| Tipo | Arquivo | Cobertura |
|------|----------|------------|
| ✅ Componente | `InputForm.test.tsx` | 100% linhas |
| ✅ Service | `authService.test.ts` | 100% funções |
| ✅ Repository | `authRepository.test.ts` | 100% branches |

> 📊 Para gerar o relatório de cobertura:
> ```bash
> npm test -- --coverage
> ```
> O relatório estará disponível em:  
> `/coverage/lcov-report/index.html`

---

## 🧱 Decisões de Arquitetura

- **Offline First**: Uso do SQLite para permitir login sem conexão.  
- **Separação de responsabilidades**:  
  - *Repository*: acesso direto ao banco  
  - *Service*: regras de negócio  
  - *Componentes*: UI pura e controlada por props  
- **Mocks de dependências externas**: testes independentes de hardware e rede.  

---

## 🧑‍💻 Autor

**Werllen — Desenvolvedor Mobile Pleno**  
Projetos: Smartfood, SmartPDV, Força de Venda, Ótima Gestão  
Stack: React Native, TypeScript, Expo, SQLite, Jest, CI/CD  

## 📱 Download do APK

Você pode baixar e testar o aplicativo pelo link abaixo:

👉 [Baixar APK - Google Drive](https://drive.google.com/drive/folders/1Ung8nOgzkHltKW-BUD2BMYmF7P12n7KZ?usp=sharing)

---

## 📎 Licença

MIT License — uso livre para fins educacionais e comerciais.
