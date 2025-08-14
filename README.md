# Plataforma de Doações - Prefeitura do Recife

![Logo da Prefeitura do Recife](./vite-project/public/imagens/logo_recife.png)

## 🎯 Sobre o Projeto

Esta é uma plataforma web desenvolvida para conectar doadores a Organizações Não Governamentais (ONGs) e outras entidades assistenciais cadastradas pela Prefeitura do Recife. O objetivo é facilitar o processo de doação, permitindo que as ONGs publiquem suas necessidades específicas e que os doadores possam atendê-las de forma direta e transparente. Além de possibilitar que ONGS postem seus excedentes para que outras ONGS possam entrar em contato e receber esses itens.

A aplicação oferece portais distintos para doadores e para ONGs, garantindo uma experiência personalizada e focada nas ações de cada perfil.

---

## ✨ Funcionalidades Principais

- **Portal para ONGs:**
  - **Gestão de Necessidades:** Cadastro, edição e acompanhamento de pedidos de doação para o público geral.
  - **Gestão de Realocações:** Publicação de itens excedentes para que outras ONGs possam solicitá-los, otimizando o uso de recursos.
  - **Acompanhamento:** Visualização do histórico de doações recebidas e itens realocados.

- **Portal para Doadores (Público):**
  - **Catálogo de Necessidades:** Visualização e busca de necessidades publicadas pelas ONGs.
  - **Filtros Avançados:** Filtros por categoria, urgência ou busca por texto para encontrar doações específicas.
  - **Contato Simplificado:** Acesso a informações de contato da ONG para combinar a entrega da doação.

- **Autenticação Segura:** Sistema de login e rotas protegidas para garantir que apenas ONGs autenticadas possam gerenciar seus dados.

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
