# Document Blacklist
<p>
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rodrigolemos/doc-blacklist">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rodrigolemos/doc-blacklist">
  <img alt="GitHub" src="https://img.shields.io/github/license/rodrigolemos/doc-blacklist">
</p>

## Sobre

Document Blacklist é um projeto teste para validação e gerenciamento de CPFs e CNPJs. Nele é possível cadastrar os documentos em uma base, validá-los, incluí-los e excluí-los de uma blacklist. Além disso, é possível ver na prática a utilização das tecnologias como NodeJS + express framework, ReactJS, Typescript, Chakra UI e várias outras APIs bastante úteis no desenvolvimento deste tipo de software. Por ser uma aplicação de teste, não há intenção em disponibilizá-la como produto ou publicá-la para uso em produção. Caso considere alguma parte do código interessante ou acredite que algo possa ser melhorado, fique à vontade para comentar. Todo feedback é bem-vindo.

## Como executar o projeto localmente

Certifique-se que você tenha instalado em sua máquina o [Git](https://git-scm.com) e o [Docker + Docker Compose](https://www.docker.com/). Em seguida, execute os seguintes passos:

```bash
# Clone este repositório
$ git clone https://github.com/rodrigolemos/doc-blacklist

# Acesse a pasta do projeto
$ cd doc-blacklist

# Instancie os containers da aplicação
$ docker-compose up -d --build

# Aguarde o processo de instalação ser finalizado. Serão criados 3 containers:
# 1- doc-blacklist-mongo: MongoDB exclusivo para a aplicação
# 2- doc-blacklist-service: Back-end da aplicação
# 3- doc-blacklist-ui: Interface da aplicação

# Verifique se o serviço foi iniciado sem problemas
$ docker logs doc-blacklist-mongo

# A resposta para o comando deve ser
# App running on port 5000
```

Após esses passos, a interface da aplicação estará disponível na porta 3000. Acesse-a pelo navegador através do endereço http://localhost:3000.

## Definições

A aplicação contém uma interface (UI) para gerenciamento de CPF/CNPJ (CRUD) com a possibilidade filtros, ordenação e marcação de alguns em uma blacklist.

### Requisitos e funcionalidades

- Validação do documento (dígito verificador) CPF/CNPJ na consulta e inclusão;
- SPA (Single Page Application) como front-end;
- Interface REST para integração do back-end com o front-end;
- Rota de suporte (/status) para verificação das informações de up-time do servidor e quantidade de consultas realizadas desde o start;
- Utilização do banco de dados MongoDB.
- Conteinerização dos projetos utilizando Docker;
- Utilização de testes unitários para as funções de validação.

## Tecnologias

### Back-end

- [NodeJS](https://nodejs.org/en/) - Servidor principal;
- [Express](https://expressjs.com/) - Um framework web para Node.js;
- [TypeScript](https://www.typescriptlang.org/) - Uma extensão do JavaScript;
- [Helmet](https://helmetjs.github.io/) - Conjunto de validações de segurança para apps express;
- [TypeORM](https://typeorm.io/) - Um dos ORMs mais populares para JavaScript e TypeScript;
- [MongoDB](https://www.mongodb.com/) - Um dos bancos de dados mais populares do mundo;
- [Jest](https://jestjs.io/) - Framework de Testes em JavaScript com um foco na simplicidade;

### Front-end

- [React JS](https://reactjs.org/) - Uma biblioteca JavaScript para criar interfaces de usuário;
- [Styled Components](https://styled-components.com/) – Uma biblioteca popular para uso de CSS-in-JS;
- [ChakraUI](https://chakra-ui.com/) – Uma biblioteca de componentes React estilizados;
- [axios](https://github.com/axios/axios) – Cliente HTTP baseado em promises;

## Autor

Rodrigo Lemos