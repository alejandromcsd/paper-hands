# Paper Hands - React/NodeJS Portfolio Tracker App

Paper Hands is a (work-in-progress) portfolio tracker app focused on cryptocurrencies. You can create portfolios and link coin positions (amount, avg purchase price). Paper Hands will generate trade recommendations at different profit levels (i.e. take profit at 5x, 8x, 10x, ...).

## Technical details

1. Uses React 17/NodeJS
2. Uses Typescript
3. Uses NestJS
4. Uses Sqlite with TypeORM
5. Boilerplate Jest + NestJS unit tests
6. Endpoints documented with Swagger

## Installation

```bash
$ npm install
```

## Setting up postgres (via Docker)

```bash
# development
$ docker-compose up

# run db migrations to create tables
$ npm run db:migrate:run
```

## Running node app

```bash
# development
$ npm run start:debug
```

## Test

```bash
# unit tests
$ npm run test
```
