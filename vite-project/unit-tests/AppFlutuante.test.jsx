import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '@/App.jsx';

vi.mock('@/context/DataContext', () => ({ DataProvider: ({ children }) => <div>{children}</div> }));
vi.mock('@/context/AuthContext', () => ({ AuthProvider: ({ children }) => <div>{children}</div>, useAuth: () => ({ isAuthenticated: true, loading: false }) }));

let telaProps;
vi.mock('@/components/ui/TelaFlutuante', () => ({ default: (props) => { telaProps = props; return <div data-testid="tf">Visivel:{String(props.isVisible)}</div>; } }));
vi.mock('@/components/ui/paginas/Tela_Home', () => ({ default: () => <div>HomeBase</div> }));
vi.mock('@/components/ui/paginas/Teladelogin', () => ({ Teladelogin: () => <div>LoginPg</div> }));

describe('App TelaFlutuante', () => {
  it('executa onClose cobrindo fechamento', () => {
    render(<App />);
    expect(screen.getByTestId('tf')).toHaveTextContent('Visivel:false');
    act(() => { telaProps.onClose(); });
    expect(screen.getByTestId('tf')).toBeInTheDocument();
  });
});
