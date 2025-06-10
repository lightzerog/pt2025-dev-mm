# Prova Técnica – Desenvolvedor(a)

Este repositório contém uma aplicação simulada de pagamento, com frontend em React e backend em Spring Boot. O projeto tem validações nos dois lados, layout responsivo, máscara de campos e regras de negócio como CPF válido e idade mínima.

---

## 📂 Estrutura do projeto

```
pt-2025-dev-mm/
├── backend/
└── frontend/
```

---

## 🚀 Tecnologias utilizadas

### 🔸 Frontend

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled-Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Axios](https://axios-http.com/)

### 🔸 Backend

- Java 17
- Spring Boot
- Maven

---

## 🧪 Como rodar o projeto

### 1️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

> A aplicação estará disponível em `http://localhost:5173`

---

### 2️⃣ Backend

```bash
cd backend
./mvnw spring-boot:run
```

> O backend estará disponível em `http://localhost:8080`

---

## ⚙️ Variáveis de ambiente

### 🔹 Frontend - `.env`

Crie um arquivo `frontend/.env` com:

```env
VITE_API_URL=http://localhost:8080/api
```

Esse valor é utilizado nas chamadas via Axios, por exemplo:

```ts
axios.post(`${import.meta.env.VITE_API_URL}/payments`, data);
```

---

### 🔹 Backend - `.env`

Crie um arquivo `backend/.env` com:

```env
PORT=8080
```

E no `application.properties`, certifique-se de ter:

```properties
server.port=${PORT:8080}
```

> Isso garante que, ao rodar com `export PORT=XXXX`, a aplicação use a porta correta.
> Lembrete, não está adicionado a dependencia dotenv-java portanto é apenas um .env exemplar.

Você também pode definir diretamente no terminal:

```bash
export PORT=8081 && ./mvnw spring-boot:run
```

---

## ✅ Funcionalidades implementadas

### Frontend
- Layout responsivo e centralizado
- Máscaras manuais: CPF, número do cartão, validade
- Validação de campos com Yup
- Componentes reutilizáveis (`Input`, `Button`)
- Feedback visual de erros
- Integração com a API usando Axios
- Tipagens completas em TypeScript, sem uso de `any`

### Backend
- Endpoint `POST /api/payments`
- Validação de CPF e idade mínima de 18 anos
- Validação da data de validade do cartão (deve estar no futuro)
- Identificação de bandeira (Visa/MasterCard)
- Erros tratados via `@ControllerAdvice`
- Nenhum dado sensível (como CVV ou número completo do cartão) é retornado

---

## 📌 Observações finais

- O projeto segue os requisitos da prova técnica.
- Não foram utilizadas bibliotecas ou frameworks além dos permitidos.
- O backend não persiste dados; apenas simula uma operação real.

---