import React from 'react';
import Planetas from './components/Planetas';
import Asteroides from './components/Asteroides';
import Cometas from './components/Cometas';
import ObjetosPeligrosos from './components/ObjetosPeligrosos';
import Observaciones from './components/Observaciones';
import PrediccionesOrbitales from './components/PrediccionesOrbitales';
import Sol from './components/Sol';

function App() {
  return (
    <div>
      <h1>Exploración Espacial</h1>
      <Planetas />
      <Asteroides />
      <Cometas />
      <ObjetosPeligrosos />
      <Observaciones />
      <PrediccionesOrbitales />
      <Sol />
    </div>
  );
}

export default App;
