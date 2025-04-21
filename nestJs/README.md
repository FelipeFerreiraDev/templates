# API

## Nest JS

O Nest.js é um framework de crescimento rápido para construir aplicativos backend eficientes, escaláveis e de nível empresarial usando o Node.js. Ele é conhecido por produzir aplicativos altamente testáveis, de fácil manutenção e escaláveis utilizando JavaScript e TypeScript modernos.

O Nest.js combina abordagens modernas e modulares com princípios de engenharia de software. Ele utiliza o TypeScript para verificação de tipos e oferece uma arquitetura de software pronta para construir e implantar aplicativos testáveis, escaláveis, com baixo acoplamento e fácil manutenção.

Mais sobre suas características encontramos em sua documentação [Nest.js](https://docs.nestjs.com/)

### ⚙️ Ferramentas

Para a aplicação utilizamos as seguintes ferramentas:

- [Swagger](https://docs.nestjs.com/openapi/introduction) _ Documentação das APIs com Swagger 
- [Prisma](https://docs.nestjs.com/recipes/prisma) _ ORM Prisma com esquema de migration
- [ClassValidator](https://docs.nestjs.com/techniques/validation) _ Validação dos dados no backend 
- [HttpModule](https://docs.nestjs.com/techniques/http-module) _ Requisições em outros serviços
- [Jest](https://docs.nestjs.com/fundamentals/testing) _ Testes unitários 
- [Guards](https://docs.nestjs.com/guards) _ Sistema de autenticação 

## 1. Requerimentos

Para o desenvolvimento, estamos utilizando um container `Docker` para subirmos o nosso serviço `api` e um banco de dados `MySQL` para persistirmos os dados.

Dessa forma, é necessário 

- [Docker](https://www.docker.com/) Para subir os serviços com o arquivo `docker compose` (node + mysql).

## 2. Organizando ambiente

### 2.1. Setar variáveis de ambientes

- Crie um arquivo `.env` para setar as variáveis de ambiente definidas como no arquivo `.env_example`

```bash
DATABASE_URL="mysql://root:root@apidb:3306/api"
SHADOW_DATABASE_URL="mysql://root:root@shadowdb:3306/api_shadow"

SERVER_TEST='true'
SERVER_PRODUCTION='false'
```

### 2.2. Instalando dependências

```bash
$ npm install
```
### 2.3. Iniciar os contêineres

```bash
# subir os serviços com docker-compose e analisar os logs na console
docker compose up 

# Caso queira iniciar os contêiners em modo background, sem visualizar os logs na console
docker compose up -d

# Caso tenha iniciado o ambiente em modo background existe uma forma de analisar os logs do contêiner em execução:
docker logs -f api
```

### 2.3. Entrar no container do serviço

```bash
$ docker compose exec api bash
```

### 2.4. Rodar as migrations e seed

```bash
$ npx prisma migrate dev
```

OBS: 
Caso você queira atualizar futuramente seu banco com as migrations:
```bash
$ npx prisma migrate dev
```

Caso você queira atualizar futuramente seu banco com a seed:
```bash
$ npx prisma db seed
```

### 2.5. Iniciando
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 2.6. Banco de dados Shadow
O banco de dados shadow é um banco de dados temporário que o Prisma usa para aplicar as migrações. Ele é criado automaticamente quando você executa o comando `prisma migrate dev` e é excluído após a execução das migrações.
O banco de dados shadow é útil para garantir que as migrações sejam aplicadas corretamente e para evitar conflitos entre as migrações. Ele é criado com o mesmo esquema do banco de dados principal, mas não contém dados.

### 2.7. Prisma Studio
Para visualizar o banco de dados, você pode usar o Prisma Studio. Para isso, execute o seguinte comando dentro do contêiner do serviço:

```bash
$ npx prisma studio
```


## 3. Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## 4. Documentação
### 4.1. Swagger
Para gerar o arquivo de documentação da API, execute o comando:
```bash
$ npx ts-node ./src/generateSwagger.ts
```

### 4.2. Documentação com compodoc
Para gerar a documentação da API, execute o comando:
```bash
$ npx @compodoc/compodoc -p tsconfig.json -s
```