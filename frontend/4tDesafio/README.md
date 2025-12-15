# Gestão de Planos e Beneficiários (Desafio Front-End)

**Autor:** Lucas Pinheiro Olhê Borges

Este projeto é uma **Single Page Application (SPA)** desenvolvida em **Angular 20**, focada no gerenciamento de beneficiários e planos de saúde. O objetivo é demonstrar competências em arquitetura front-end, consumo de APIs REST, formulários reativos e componentização.

## Tecnologias e Decisões Técnicas

A aplicação foi construída visando escalabilidade, manutenibilidade e experiência do usuário.

* **Core:** Angular v20 (Arquitetura modular baseada em NgModules, conforme requisitos).
* **Estilização:** Bootstrap 5 + SCSS (Agilidade no layout e responsividade) e Bootstrap Icons.
* **Feedback/UX:** SweetAlert2 (Alertas e confirmações de ações destrutivas amigáveis).
* **Roteamento:** Angular Router (Lazy Loading implementado para otimização de bundle).
* **Formulários:** Reactive Forms (Validações complexas e tipagem segura).
* **API Mock:** JSON-Server (Simulação completa de uma API RESTful).
* **Containerização:** Docker & Docker Compose (Ambiente de execução padronizado).

### Destaques da Implementação
* **Abstração de Services:** Comunicação HTTP isolada e tipada, removendo lógica de negócio dos componentes.
* **Filtros Server-Side:** A listagem utiliza parâmetros de query (`status` e `plano_id`) para filtrar dados diretamente na "API", otimizando o tráfego.
* **Tratamento de Erros:** Feedback visual claro em caso de falhas de comunicação com o backend.

## Pré-requisitos

Para execução local (sem Docker):
* [Node.js](https://nodejs.org/) (v18+)
* [Angular CLI](https://github.com/angular/angular-cli) (v19+)


## Como executar o projeto

### Opção 1: Rodando via Docker (Recomendado)

Se possuir o Docker instalado, execute todo o ambiente (Front + API) com um único comando:

```bash
# Na raiz do projeto
docker-compose up --build
```
Aplicação: https://localhost:4200
API: http://localhost:3000
## Opção 2: Rodando Manualmente
**1. Clone o repositório e instale as dependências:**

```bash
git clone https://github.com/Lcszin/4t-desafios.git
cd 4t-desafios/frontend/4tDesafio
npm install
```

**2. Execute a API Mock (Terminal 1):**

```bash
npm run api
```

**3. Inicie a Aplicação (Terminal 2):**

```bash
npm start
```
## Testes
Para executar a suíte de testes unitários (Jasmine/Karma):

```bash
npm test
```