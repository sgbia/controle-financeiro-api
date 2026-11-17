# 💰 FinanceFlow API

**API RESTful para gerenciamento de finanças pessoais e acompanhamento do consumo consciente.**

O FinanceFlow API é um projeto desenvolvido com NestJS, TypeScript e MongoDB Atlas para registrar receitas e despesas, consultar o histórico financeiro e calcular métricas que ajudam a compreender os hábitos de consumo.

## 🚀 Tecnologias utilizadas

- **NestJS** — Framework para desenvolvimento da API.
- **TypeScript** — Linguagem utilizada no projeto.
- **MongoDB Atlas** — Banco de dados na nuvem.
- **Mongoose** — Integração com o MongoDB.
- **Postman** — Testes das requisições HTTP.
- **class-validator** — Validação dos dados recebidos.

## ✨ Funcionalidades

- Cadastro de receitas e despesas.
- Classificação de transações por categoria.
- Identificação de gastos conscientes e por impulso.
- Consulta ao histórico financeiro.
- Cálculo automático do saldo total.
- Cálculo do total de despesas.
- Cálculo do total de gastos por impulso.
- Validação dos dados enviados à API.

## 📌 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | `/transacoes` | Cadastra uma nova transação |
| GET | `/transacoes` | Retorna o histórico e as métricas financeiras |

### Exemplo de cadastro

**POST** `/transacoes`

```json
{
  "descricao": "Compras no supermercado",
  "valor": 250,
  "tipo": "despesa",
  "categoria": "Alimentação",
  "consumoConsciente": true
}
```

### Exemplo de consulta

**GET** `/transacoes`

O retorno contém o histórico de transações e as métricas calculadas:

```json
{
  "historico": [],
  "metricas": {
    "saldoTotal": 0,
    "totalDespesas": 0,
    "totalGastoImpulso": 0
  }
}
```

*Os valores acima representam um banco de dados sem transações cadastradas.*

## ⚙️ Como executar o projeto

**Pré-requisitos:** Node.js, npm e acesso a um cluster MongoDB Atlas.

1. Clone o repositório.
2. Abra a pasta do projeto no terminal.
3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto, utilizando `.env.example` como referência:

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@SEU_CLUSTER.mongodb.net/controle_financeiro
PORT=3000
```

5. Inicie a aplicação:

```bash
npm run start:dev
```

6. Acesse a API em:

```text
http://localhost:3000/transacoes
```

## 🧪 Testes

As rotas foram testadas utilizando o Postman, incluindo o cadastro de receitas, despesas conscientes, despesas por impulso, consulta das métricas e rejeição de valores negativos.

## 🔒 Segurança

As credenciais do MongoDB são armazenadas em variáveis de ambiente e não devem ser publicadas no repositório.

## 📚 Contexto

Projeto acadêmico desenvolvido para aplicar conceitos de APIs RESTful, desenvolvimento back-end, persistência de dados e integração com banco de dados NoSQL.