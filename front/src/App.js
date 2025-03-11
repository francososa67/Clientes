import React, { useState } from 'react';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Transaccion from './components/Transaccion'; // Importamos el nuevo componente

const App = () => {
  const [activeTab, setActiveTab] = useState('clientes');

  return (
    <div>
      <div className="tabs">
        <button 
          onClick={() => setActiveTab('clientes')} 
          className={activeTab === 'clientes' ? 'active' : ''}
        >
          Clientes
        </button>
        <button 
          onClick={() => setActiveTab('productos')} 
          className={activeTab === 'productos' ? 'active' : ''}
        >
          Productos
        </button>
        <button 
          onClick={() => setActiveTab('transacciones')} 
          className={activeTab === 'transacciones' ? 'active' : ''}
        >
          Transacciones
        </button>
      </div>

      {activeTab === 'clientes' && <Clientes />}
      {activeTab === 'productos' && <Productos />}
      {activeTab === 'transacciones' && <Transaccion />}
    </div>
  );
};

export default App;
