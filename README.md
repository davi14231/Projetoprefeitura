# Plataforma de Doações - Prefeitura do Recife

![Logo da Prefeitura do Recife](./vite-project/public/imagens/logo_recife.png)

## 🎯 Sobre o Projeto

Esta é uma plataforma web desenvolvida para conectar doadores a Organizações Não Governamentais (ONGs) e outras entidades assistenciais cadastradas pela Prefeitura do Recife. O objetivo é facilitar o processo de doação, permitindo que as ONGs publiquem suas necessidades específicas e que os doadores possam atendê-las de forma direta e transparente. Além de possibilitar que ONGS postem seus excedentes para que outras ONGS possam entrar em contato e receber esses itens.

A aplicação oferece portais distintos para doadores e para ONGs, garantindo uma experiência personalizada e focada nas ações de cada perfil.

---

## ✨ Funcionalidades Principais

- **Portal para ONGs:**
  - Cadastro e gestão de necessidades (pedidos de doação).
  - Acompanhamento do status das doações recebidas.
  - Visualização do histórico de itens recebidos.
- **Portal para Doadores:**
  - Visualização e busca de necessidades publicadas pelas ONGs.
  - Filtros por categoria de item, urgência e localização.
  - Realização de doações de forma simplificada.
- **Autenticação Segura:** Sistema de login e rotas protegidas para garantir a segurança dos dados.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com tecnologias modernas, visando performance, escalabilidade e uma ótima experiência de desenvolvimento.

- **Frontend:**
  - **[React](https://react.dev/)**: Biblioteca para construção da interface de usuário.
  - **[Vite](https://vitejs.dev/)**: Ferramenta de build e desenvolvimento extremamente rápida.
  - **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS para estilização rápida e customizável.
  - **[React Router](https://reactrouter.com/)**: Para gerenciamento de rotas na aplicação.
  - **[Axios](https://axios-http.com/)**: Cliente HTTP para comunicação com a API.
- **Testes:**
  - **[Vitest](https://vitest.dev/)**: Framework para testes unitários e de componentes.
  - **[Playwright](https://playwright.dev/)**: Para testes end-to-end (E2E), simulando a interação real do usuário.
  - **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: Para testar componentes React da forma como os usuários os utilizam.
- **Qualidade de Código:**
  - **[ESLint](https://eslint.org/)**: Ferramenta para identificar e corrigir problemas no código JavaScript/React.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento localmente.

### Pré-requisitos

- **[Node.js](https://nodejs.org/en)** (versão 18.x ou superior)
- **[NPM](https://www.npmjs.com/)** (geralmente instalado com o Node.js)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/davi14231/Projetoprefeitura.git
   ```

2. **Navegue até a pasta do projeto principal:**
   ```bash
   cd Projetoprefeitura/vite-project
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

### Execução

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

2. **Para visualizar a versão de produção localmente (após o build):**
   ```bash
   # Primeiro, crie a build de produção
   npm run build

   # Depois, inicie o servidor de preview
   npm run preview
   ```

---

## 🧪 Como Rodar os Testes

O projeto possui uma suíte de testes completa para garantir a qualidade e a estabilidade do código.

### Testes Unitários e de Componentes (Vitest)

Execute os seguintes comandos na pasta `vite-project`:

- **Rodar todos os testes uma vez:**
  ```bash
  npm test
  ```

- **Rodar os testes em modo "watch" (re-executa ao salvar alterações):**
  ```bash
  npm run test:watch
  ```

- **Visualizar os resultados em uma interface gráfica:**
  ```bash
  npm run test:ui
  ```

- **Gerar o relatório de cobertura de testes:**
  ```bash
  npm run test:coverage
  ```
  O relatório será gerado na pasta `coverage/`.

### Testes End-to-End (Playwright)

Os testes E2E simulam o fluxo completo do usuário no navegador.

- **Rodar todos os testes E2E em modo "headless" (sem interface gráfica):**
  ```bash
  npm run test:e2e
  ```

- **Rodar os testes E2E com interface gráfica (headed):**
  ```bash
  npm run test:e2e:headed
  ```

- **Abrir a interface do Playwright para rodar e depurar testes de forma interativa:**
  ```bash
  npm run test:e2e:ui
  ```
