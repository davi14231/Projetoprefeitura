// Teste simples para verificar se o ambiente está funcionando
describe('Simple Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });
  
  it('should work with strings', () => {
    expect('hello').toBe('hello');
  });
  
  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });
});
