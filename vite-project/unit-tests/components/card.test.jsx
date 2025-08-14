import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card.jsx';

// Testa renderização de todos os slots e combinação de className

describe('card ui components', () => {
  it('renderiza estrutura completa com classNames customizados', () => {
    render(
      <Card data-testid="card-root" className="extra">
        <CardHeader data-testid="card-header" className="h-class">
          <CardTitle data-testid="card-title">Titulo</CardTitle>
          <CardDescription data-testid="card-desc">Descricao</CardDescription>
          <CardAction data-testid="card-action">Acao</CardAction>
        </CardHeader>
        <CardContent data-testid="card-content">Conteudo</CardContent>
        <CardFooter data-testid="card-footer">Rodape</CardFooter>
      </Card>
    );
    expect(screen.getByTestId('card-root').className).toMatch(/extra/);
    ['card-header','card-title','card-desc','card-action','card-content','card-footer'].forEach(id=>{
      expect(screen.getByTestId(id)).toBeInTheDocument();
    });
  });
});
