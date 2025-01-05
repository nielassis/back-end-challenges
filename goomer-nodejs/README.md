# Goomer Lista Rango - API Backend

Bem-vindo ao **Goomer Lista Rango**, a API RESTful desenvolvida como parte do desafio [Developer Backend](https://github.com/goomerdev/job-dev-backend-interview) da [Goomer](https://www.goomer.com.br/). 🚀!

Essa aplicação foi criada para gerenciar restaurantes e seus cardápios de maneira eficiente, com foco na simplicidade, escalabilidade e boas práticas de desenvolvimento.

---

## 📝 Descrição

A **Goomer Lista Rango** é uma API que permite a gestão de restaurantes e produtos de cardápios. Ela possibilita operações de CRUD (Create, Read, Update, Delete) para restaurantes e produtos, além de gerenciar promoções de maneira eficiente, com validação de horários.

### Funcionalidades da API

#### **Restaurantes** 🍽️

- **Listar** todos os restaurantes.
- **Cadastrar** novos restaurantes.
- **Detalhar** informações de um restaurante.
- **Alterar** dados de um restaurante.
- **Excluir** um restaurante.

#### **Produtos** 🍔

- **Listar** produtos de um restaurante.
- **Criar**, **Alterar** e **Excluir** produtos.

#### **Promoções** 🎉

- **Criar** promoções para produtos.
- **Alterar** promoções existentes.
- **Listar** promoções ativas.

---

## 💻 Tecnologias

- **Node.js** - Backend com JavaScript.
- **Express** - Framework web minimalista.
- **PostgreSQL / MySQL** - Banco de dados relacional.
- **Sequelize** (ou raw SQL) - ORM para facilitar a interação com o banco de dados.

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, garanta que você tenha o seguinte:

- **Node.js** (>= 16.x)
- **Banco de Dados** (PostgreSQL ou MySQL) configurado na sua máquina.
- **Postman** ou **Insomnia** para testar a API (opcional, mas recomendado).

## Passos para Configuração

### 1. Clone o Repositório

Primeiro, clone o repositório, mas sem baixar todo o conteúdo. Isso economiza espaço e tempo, já que você estará interessado apenas no diretório `goomer-nodejs`.

```bash
git clone --filter=blob:none --no-checkout https://github.com/nielassis/back-end-challenges.git
cd back-end-challenges
```

### 2. Habilite o Sparse-Checkout

Ative o sparse-checkout para permitir que o Git baixe apenas o diretório específico.

```bash
git sparse-checkout init --cone
```

### 3. Baixe o Diretório `goomer-nodejs`

Configure o Git para baixar apenas o diretório `goomer-nodejs` do repositório.

```bash
git sparse-checkout set goomer-nodejs
```

### 4. Instale as Dependências

Agora que você tem a pasta `goomer-nodejs` clonada, acesse o diretório e instale as dependências do projeto.

```bash
cd goomer-nodejs
npm install
```

3. **Configuração do Banco de Dados:**

Crie um arquivo `.env` na raiz do projeto e insira as configurações de banco de dados:

```env
DATABASE_URL=""
FRONTEND_URL="" # para fetch de dados da API
```

4. **Execute as Migrações do Banco de Dados:**

```bash
npm run migrate
```

(Caso ocorra algum erro na migração)
Certifique-se de que sequelize-cli esteja instalado.

```bash
npm install sequelize-cli
```

rode as migrações.

```bash
npx sequelize-cli db:migrate --name 20250104144908-create-restaurantes.js

npx sequelize-cli db:migrate --name 20250104144908-create-produtos.js

```

5. **Inicie a Aplicação:**

```bash
npm run dev
```

Sua API estará disponível em [http://localhost:3000](http://localhost:3000).

A documentação da API estará disponível em [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## 🚀 Desafios Enfrentados

Durante o desenvolvimento, enfrentei alguns desafios técnicos que foram superados com criatividade e boas práticas:

- **Validação de Horários:** Um dos maiores desafios foi validar os horários de funcionamento dos restaurantes e promoções, garantindo que os intervalos entre horários tivessem, no mínimo, 15 minutos de diferença.
- **Relacionamento entre Dados:** Como restaurantes podem ter muitos produtos e promoções associadas, a criação de uma estrutura de banco de dados eficiente e escalável foi um grande desafio. Utilizei relacionamentos entre as tabelas para manter os dados organizados.

- **Boas Práticas de Código:** Procurando sempre seguir os princípios de **SOLID**, **KISS** e **DRY**, busquei manter o código o mais simples e reutilizável possível.

---

## 📈 Melhorias

Embora a aplicação esteja funcional, existem diversas melhorias que foram feitas para tornar a aplicação mais colaborativa e acertiva:

1. **Documentação da API:** documentação interativa utilizando **Swagger** para facilitar o uso da API por outros desenvolvedores.

2. **Validação da entrada de dados com ZOD:** validação de entrada de dados utilizando **Zod** para garantir a integridade dos dados.

---

## 🌟 Como Melhorar a Aplicação

Algumas melhorias que podem ser feitas no futuro para tornar a aplicação ainda mais robusta:

- **ORM Completo:** Embora tenha sido solicitado o uso de SQL direto, utilizei o sequelize para as consultas no banco de dados para garantir uma abstração mais completa. As linhas de código SQL por raw queries estão comentadas.

- **Implementação de Webhooks:** Para sistemas de notificação, seria interessante adicionar Webhooks que notificariam os restaurantes sobre mudanças nos produtos ou promoções.

- **Deploy na Nuvem:** Deploy em plataformas como **Heroku** ou **AWS** para tornar a aplicação acessível de qualquer lugar.

---

## 📄 Conclusão

Essa foi uma ótima oportunidade para demonstrar minhas habilidades no desenvolvimento de APIs RESTful, sempre com foco na qualidade do código e na escalabilidade da aplicação.

Fico à disposição para esclarecimentos sobre o projeto ou sugestões de melhoria!

---

## 🔗 Links Úteis

- [Link do Repositório (Desafio)](https://github.com/goomerdev/job-dev-backend-interview)
- [Documentação da API (Swagger)](https://swagger.io/)
