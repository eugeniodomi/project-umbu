# 🍔 Raízes do Nordeste - Sistema de Franquias (QA & Front-end)

Este repositório contém a aplicação baseada no estudo de caso "Raízes do Nordeste", desenvolvida como requisito prático para a disciplina de **Projeto Multidisciplinar - Qualidade de Software**.

O foco principal deste projeto **não é** a entrega de um produto comercial completo, mas sim a construção de um ambiente governável para a **Garantia da Qualidade (QA)**, evidenciando boas práticas de arquitetura, testes automatizados (Unitários e E2E), rastreabilidade e conformidade com requisitos não funcionais (como usabilidade e LGPD).

---

## 🎯 Objetivos do Projeto

- **Padronização do Atendimento:** Interface unificada para operação multicanal (App, Totem, Retirada).
- **Cobertura de Testes:** Implementação de testes em camadas para assegurar regras de negócio e fluxos críticos.
- **Conformidade Legal:** Aplicação prática da Lei Geral de Proteção de Dados (LGPD) na interface.
- **Separação de Responsabilidades:** Arquitetura limpa para isolar regras de negócio, interface e infraestrutura externa.

## 🛠️ Stack Tecnológico

- **Front-end:** React 19, Vite
- **Linguagem:** TypeScript (Tipagem estática e segurança)
- **Roteamento:** React Router DOM (Single Page Application)
- **Testes Unitários/Integração:** Vitest
- **Testes End-to-End (E2E):** Cypress
- **Estilização:** CSS modular/padrão (foco em leveza e performance)

---

## 🏗️ Arquitetura e Estrutura de Diretórios

O projeto foi estruturado com inspiração em princípios de *Domain-Driven Design (DDD)*, garantindo que as lógicas de testes possam atuar em camadas isoladas:

```text
projeto-umbu/
├── cypress/                # Testes end-to-end (E2E) simulando a jornada do usuário
├── src/                    
│   ├── __tests__/          # Testes unitários e de integração (Vitest)
│   ├── application/        # Orquestração de regras da aplicação (ex: fidelizacaoService)
│   ├── components/         # Componentes visuais reutilizáveis (UI)
│   ├── context/            # Gerenciamento de estado global (CartContext, AuthContext)
│   ├── domain/             # Regras de negócio puras e validações independentes (ex: validarPedido)
│   ├── infrastructure/     # Integrações simuladas (Mocks de pagamento) e dados locais
│   ├── pages/              # Telas principais associadas às rotas
│   └── App.tsx             # Ponto de entrada e configuração de rotas
└── vitest/cypress configs  # Configurações de automação de QA

## Critérios Acadêmicos Atendidos (Matriz de Qualidade)
Para guiar a avaliação técnica, os seguintes requisitos foram implementados de forma rastreável no
código:
* **Testabilidade e Mocks:** O sistema de pagamento externo (fora do escopo de produção) foi isolado.
Criamos o serviço `paymentMockService.ts` na camada de infraestrutura para simular latência de rede,
aprovações e falhas. Isso permite validar as transições de estado da interface sem depender de
gateways reais.
* **Privacidade e LGPD (RNF-08):** Aplicação de um `ConsentBanner` global. O sistema registra logs de
auditoria no console (`LGPD_CONSENT_GIVEN`) e persiste a escolha do usuário no `localStorage`.
* **Multicanalidade e Usabilidade (RNF-04):** Os canais de atendimento técnicos (APP, TOTEM,
PICKUP) e o status de operação ("ativa", "reduzida") foram convertidos em identificadores visuais (ex: 🟢
Aberta, ️ Retirada), otimizando a compreensão da interface.
* **Proteção de Rotas:** Implementação de Route Guards para assegurar a integridade do fluxo de
navegação, impedindo que usuários com sessão ativa retornem à tela de login indevidamente.
---
## Estratégia de Testes e QA
O repositório foi configurado como um ambiente de validação contínua para geração de evidências,
contando com:
* **Testes Unitários e de Integração (Vitest):** Asseguram o funcionamento isolado das regras de
domínio, como o cálculo do programa de fidelidade e a recusa de submissão de pedidos vazios, além da
confiabilidade dos mocks de infraestrutura.
* **Testes End-to-End (Cypress):** O script `fluxo-critico.cy.ts` automatiza a jornada principal do sistema.
A automação valida o aceite da LGPD, a submissão de login, a seleção de franquia, a adição de
produtos ao carrinho e a finalização do checkout.
---
## 🚀 Como Executar o Projeto
> **Pré-requisito:** Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado em seu ambiente.
### 1. Instalação das dependências
```bash
npm install
```
### 2. Executar a aplicação localmente
```bash
npm run dev
```
> Acesse `http://localhost:5173` no navegador. Pressione `F12` para abrir a aba "Console" do DevTools e
acompanhar os eventos de observabilidade registrados durante a navegação (ex: `ORDER_CREATED`,
`PAYMENT_SUCCESS`).
### 3. Executar Testes Unitários e de Integração

```bash
npm run test
```
### 4. Executar Testes End-to-End (Interface Gráfica)
⚠️ *Importante: O servidor de desenvolvimento (passo 2) deve estar rodando em um terminal separado
antes de iniciar a interface de testes E2E.*
```bash
npm run cypress:open
```
> Na janela do Cypress, clique em **E2E Testing** > escolha o navegador de sua preferência > clique no
arquivo `fluxo-critico.cy.ts` para iniciar a execução da automação.
---
*Desenvolvido como projeto de avaliação acadêmica.*