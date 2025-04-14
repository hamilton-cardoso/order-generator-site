# order-generator-site 🚀

Aplicação frontend em Angular para envio de ordens via protocolo FIX, consumindo uma API .NET integrada ao sistema de negociação.

---

## 📦 Tecnologias

- [Angular v18+](https://angular.io)
- Angular Material
- RXJS
- TypeScript

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Angular CLI](https://angular.io/cli)

> Verifique sua versão com:
```bash
ng version
```

---

## 🚀 Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/hamilton-cardoso/order-generator-site.git
cd order-generator-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
ng serve
```

4. Acesse no navegador:

```
http://localhost:4200
```

---

## ⚙️ Configuração de ambiente

A URL base da API está localizada no arquivo:

```
src/environments/environment.ts
```

### Exemplo:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7268/api'
};
```

---

## 📁 Estrutura principal

```
src/
├── app/
│   ├── layout/
│   │   ├── header/
│   │   └── menu/
│   ├── models/
│   │   └── fix-order-result.model.ts
│   ├── pages/
│   │   ├── home/
│   │   └── order/  			→ Formulário e lógica principal
│   ├── services/
│   │   ├── order.service.ts	→ Comunicação com API (order.service.ts)
│   │   └── order.service.spec.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── styles.scss
├── environments/
│   └── environment.ts			→ Configurações por ambiente
├── index.html
└── main.ts
```
