import './App.css';

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import CadastroAulas from './components/pages/CadastroAulas';
import GestaoAulas from './components/pages/GestaoAulas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cadastro_aula' element={<CadastroAulas/>} />
        <Route path='/gestao_aulas' element={<GestaoAulas/>} />
      </Routes>
    </Router>
  );
}

export default App;
