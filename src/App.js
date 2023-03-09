import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import UsuariosTabla from './components/usuariosTabla';



function App() {
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<UsuariosTabla></UsuariosTabla>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
