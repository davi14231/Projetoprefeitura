import React, { useState, useEffect } from 'react';
import api from '../services/api';

// Base da API configurável por ambiente
const API_BASE_URL = import.meta.env?.VITE_API_URL || '/api';

const BackendConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setConnectionStatus('checking');
    setError(null);
    
    try {
      // Tentar conectar na rota principal do backend
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain'
        }
      });
      
      if (response.ok) {
        const text = await response.text();
        console.log('✅ Backend conectado:', text);
        setConnectionStatus('connected');
        
        // Testar endpoint de doações
        await testDoacoesEndpoint();
      } else {
        setConnectionStatus('disconnected');
        setError('Backend respondeu com erro: ' + response.status);
      }
    } catch (err) {
      console.error('❌ Erro ao conectar com backend:', err);
      setConnectionStatus('disconnected');
      setError('Não foi possível conectar com o backend na porta 3000');
    }
  };

  const testDoacoesEndpoint = async () => {
    try {
      const response = await api.get('/doacoes');
      console.log('✅ Endpoint /doacoes funcionando:', response.data);
      setBackendData(response.data);
    } catch (err) {
      console.error('❌ Erro no endpoint /doacoes:', err);
      setError('Endpoint /doacoes não está funcionando: ' + err.message);
    }
  };

  useEffect(() => {
    // Intencional: executa apenas uma vez ao montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    testConnection();
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-red-600';
      case 'checking': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return '✅ Conectado';
      case 'disconnected': return '❌ Desconectado';
      case 'checking': return '🔄 Verificando...';
      default: return '❓ Desconhecido';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">Status do Backend</h3>
        <button
          onClick={testConnection}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Testar
        </button>
      </div>
      
      <div className={`text-sm font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </div>
      
      {error && (
        <div className="text-xs text-red-600 mt-1">
          {error}
        </div>
      )}
      
      {connectionStatus === 'connected' && backendData && (
        <div className="text-xs text-green-600 mt-1">
          Dados carregados: {Array.isArray(backendData) ? backendData.length : 'objeto'} itens
        </div>
      )}
      
      {connectionStatus === 'disconnected' && (
        <div className="text-xs text-gray-600 mt-2">
          <p>Para conectar com o backend:</p>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>Clone o repositório do backend</li>
            <li>Execute <code className="bg-gray-100 px-1 rounded">npm install</code></li>
            <li>Execute <code className="bg-gray-100 px-1 rounded">npm start</code></li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default BackendConnectionTest;
