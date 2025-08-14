import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App.jsx';

// Mock providers
vi.mock('@/context/DataContext', () => ({ DataProvider: ({ children }) => <div data-testid="data-provider">{children}</div> }));
vi.mock('@/context/AuthContext', () => ({ AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>, useAuth: () => ({ isAuthenticated: true, loading: false }) }));

// Mock pages
vi.mock('@/components/ui/paginas/Tela_Home', () => ({ default: ({ imagensCarrossel }) => <div data-testid="home">Home ({imagensCarrossel.length})</div> }));
vi.mock('@/components/ui/paginas/Teladelogin', () => ({ Teladelogin: () => <div>Login Page</div> }));
vi.mock('@/components/ui/paginas/EditDoacoes', () => ({ EditDoacoes: () => <div>EditDoacoes</div> }));
vi.mock('@/components/ui/paginas/HomeRealocacao', () => ({ HomeRealocacao: () => <div>HomeRealocacao</div> }));
vi.mock('@/components/ui/paginas/SolicitarDoacao', () => ({ SolicitarDoacao: () => <div>SolicitarDoacao</div> }));
vi.mock('@/components/ui/paginas/PostagemRealocacao', () => ({ PostagemRealocacao: () => <div>PostagemRealocacao</div> }));
vi.mock('@/components/ui/paginas/TodasDoacoes', () => ({ default: () => <div>TodasDoacoes</div> }));
vi.mock('@/components/ui/paginas/TelahomeONG', () => ({ default: ({ imagensCarrossel }) => <div>TelahomeONG ({imagensCarrossel.length})</div> }));
vi.mock('@/components/ui/paginas/RealocacaoListagem', () => ({ RealocacaoListagem: () => <div>RealocacaoListagem</div> }));
vi.mock('@/components/ui/paginas/ConfirmacaoEncerrarSolicitacao', () => ({ default: () => <div>ConfirmarEncerrarSolicitacao</div> }));
vi.mock('@/components/ui/paginas/ConfirmacaoEncerrarRealocacao', () => ({ default: () => <div>ConfirmarEncerrarRealocacao</div> }));
vi.mock('@/components/ui/paginas/ConfirmacaoDeletar', () => ({ default: () => <div>ConfirmarDeletar</div> }));
vi.mock('@/components/ui/TelaFlutuante', () => ({ default: ({ isVisible }) => <div data-testid="tela-flutuante">Flutuante:{String(isVisible)}</div> }));

describe('App (BrowserRouter)', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('renderiza home com 3 imagens do carrossel e providers', () => {
    render(<App />);
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('data-provider')).toBeInTheDocument();
    expect(screen.getByTestId('home')).toHaveTextContent('Home (3)');
    expect(screen.getByTestId('tela-flutuante')).toHaveTextContent('Flutuante:false');
  });

  it('renderiza login quando URL é /login', () => {
    window.history.pushState({}, '', '/login');
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
