# Sistema de Navegação - React Router DOM

## Rotas Implementadas

### Páginas Principais
- `/` - Tela_Home (página inicial)
- `/login` - Teladelogin 
- `/edit-doacoes` - EditDoacoes (painel de edição)
- `/home-realocacao` - HomeRealocacao
- `/solicitar-doacao` - SolicitarDoacao (modal)
- `/postagem-realocacao` - PostagemRealocacao
- `/todas-doacoes` - TodasDoacoes (listagem de necessidades)
- `/home-ong` - TelahomeONG
- `/realocacao-listagem` - RealocacaoListagem
- `/confirmar-encerrar-solicitacao` - ConfirmacaoEncerrarSolicitacao
- `/confirmar-encerrar-realocacao` - ConfirmacaoEncerrarRealocacao

## Navegação Implementada

### Header Principal
- **Início** → `/` 
- **Realocação** → `/realocacao-listagem`
- **Necessidades** → `/todas-doacoes`
- **Edição** → `/edit-doacoes`

### HeaderTelainicial  
- **Entrar como ONG** → `/login`

### BlocoInformativoDoador
- **Encontre necessidades** → `/todas-doacoes`

### BlocoInformativoONG
- **Cadastre sua ONG** → `/login`

### Navegação entre páginas
- **Teladelogin** → `/edit-doacoes` (após login)
- **EditDoacoes** ⟷ **HomeRealocacao** (tabs)
- **EditDoacoes** → **SolicitarDoacao** (modal)
- **HomeRealocacao** → **PostagemRealocacao**
- **Botões Cancelar** → Volta à página anterior (`navigate(-1)`)

### Modais e Confirmações
- **ConfirmacaoEncerrarSolicitacao** → `/edit-doacoes` (após confirmar)
- **ConfirmacaoEncerrarRealocacao** → `/home-realocacao` (após confirmar)

## Funcionalidades de Navegação

1. **useNavigate** implementado em todas as páginas
2. **Link** components do React Router nos layouts
3. **Navegação programática** para ações de botões
4. **Navegação histórica** (`navigate(-1)`) para voltar
5. **Passagem de props** (imagensCarrossel, itens) entre rotas

## Status: ✅ COMPLETO
Todas as páginas estão conectadas e podem se comunicar através do sistema de roteamento.
