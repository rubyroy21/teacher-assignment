import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { AddData } from './pages/AddData';
import {EditData} from './pages/EditData'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/addData" element={<AddData/>}/>
        <Route path="/editData/:id" element={<EditData/>}/>
      </Routes>
    </div>
  );
}

export default App;
