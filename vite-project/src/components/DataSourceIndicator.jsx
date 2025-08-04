import React from 'react';
import { useData } from '@/context/DataContext';

export function DataSourceIndicator() {
  const { apiConnected, checkApiConnection } = useData();
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
        <div className="text-xs text-gray-600 mb-2">Status da API:</div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            apiConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm font-medium">
            {apiConnected ? 'API Conectada' : 'API Desconectada'}
          </span>
        </div>
        <button 
          onClick={checkApiConnection}
          className="mt-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
        >
          Verificar Conexão
        </button>
      </div>
    </div>
  );
}

export default DataSourceIndicator;
