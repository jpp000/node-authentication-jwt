# API com Express e MongoDB

Esta é uma aplicação de API criada com Express e MongoDB. A API possui endpoints públicos e privados. Os endpoints privados requerem um token para serem acessados, que é entregue após um login bem-sucedido. A validação do token é feita através de um middleware. A aplicação realiza a autenticação do usuário com login e senha, gerando um token JWT para acesso às rotas protegidas, garantindo segurança nas operações.

## Requisitos

- Node.js
- npm ou yarn
- MongoDB

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/sua-repositorio.git
    cd sua-repositorio
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
    ```
    PORT=3000
    DB_USER=seu-usuario-mongodb
    DB_PASS=sua-senha-mongodb
    SECRET=sua-senha-segredo-jwt
    ```

4. Inicie o servidor:
    ```sh
    npm start
    ```

### Iniciar a Aplicação

Para iniciar a aplicação, utilize o comando:

```sh
nodemon src/server.js
```

Este comando inicia o servidor utilizando o `nodemon`, que automaticamente reinicia o servidor sempre que houver mudanças no código. Se o `nodemon` não estiver instalado globalmente, você pode instalá-lo com:

```sh
npm install -g nodemon
```


## Endpoints

### Rota Pública

#### Bem-vindo

- **URL:** `/`
- **Método:** `GET`
- **Descrição:** Retorna uma mensagem de boas-vindas.
- **Resposta de Sucesso:**
    ```json
    {
      "msg": "Bem vindo a nossa API!"
    }
    ```

### Rotas Privadas

#### Obter Dados do Usuário

- **URL:** `/user/:id`
- **Método:** `GET`
- **Cabeçalho:**
    ```http
    Authorization: Bearer seu-token-jwt
    ```
- **Descrição:** Retorna os dados do usuário com o ID fornecido.
- **Resposta de Sucesso:**
    ```json
    {
      "user": {
        "id": "id-do-usuario",
        "name": "nome-do-usuario",
        "email": "email-do-usuario"
      }
    }
    ```
- **Resposta de Erro:**
    - 404 Not Found: Usuário não encontrado.
    - 401 Unauthorized: Acesso negado.
    - 400 Bad Request: Token inválido.

### Autenticação

#### Registrar Usuário

- **URL:** `/auth/register`
- **Método:** `POST`
- **Dados de Envio:**
    ```json
    {
      "name": "seu-nome",
      "email": "seu-email",
      "password": "sua-senha",
      "confirmPassword": "confirmacao-senha"
    }
    ```
- **Descrição:** Registra um novo usuário.
- **Resposta de Sucesso:**
    ```json
    {
      "msg": "Usuário criado com sucesso!"
    }
    ```
- **Resposta de Erro:**
    - 422 Unprocessable Entity: Nome, email ou senha ausentes ou inválidos, ou senhas não conferem, ou email já em uso.
    - 500 Internal Server Error: Erro no servidor.

#### Login

- **URL:** `/auth/login`
- **Método:** `POST`
- **Dados de Envio:**
    ```json
    {
      "email": "seu-email",
      "password": "sua-senha"
    }
    ```
- **Descrição:** Realiza o login do usuário.
- **Resposta de Sucesso:**
    ```json
    {
      "msg": "Autenticação realizada com sucesso!",
      "token": "seu-token-jwt"
    }
    ```
- **Resposta de Erro:**
    - 422 Unprocessable Entity: Email ou senha ausentes ou inválidos, ou usuário não cadastrado, ou senha inválida.
    - 500 Internal Server Error: Erro no servidor.

## Middleware de Validação de Token

O middleware `checkToken` verifica se o token fornecido no cabeçalho da requisição é válido. Se o token for inválido ou não for fornecido, a resposta será um erro 401 Unauthorized ou 400 Bad Request.

## Estrutura do Projeto

```plaintext
.
├── controllers
│   ├── authController.js
│   └── dataController.js
├── middleware
│   └── authMiddleware.js
├── models
│   └── userModel.js
├── routes
│   ├── authRoutes.js
│   └── dataRoutes.js
├── .env
├── app.js
├── package.json
└── README.md
