import './App.css';
import Show from './Componets/Show';
import Create from './Componets/Create';
import Edit from './Componets/Edit';

import { BrowserRouter, Route,Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>
        <Route path='/' element={<Show/>}></Route>
        <Route path='/crear' element={<Create/>}></Route>
        <Route path='/editar/:id' element={<Edit/>}></Route>
        
      </Routes>
      </BrowserRouter>


    
    </div>
  );
}

export default App;
