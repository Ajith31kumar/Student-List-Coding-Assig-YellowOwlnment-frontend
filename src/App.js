
import './App.css';
import Addstud from './Component/Addstud';
import Allstud from './Component/Allstud';
// import Navbar from './Component/Navbar';
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Editstud from './Component/Editstud';
import Viewstud from './Component/Viewstud';
// import SideBar from './Component/sideBar';
import Main from './Component/Main';

function App() {
  return (
 <div className='app'>
 <BrowserRouter>
 <Main>
 <Routes>
  <Route path='/' element={<Allstud/>}/>
  <Route path='/addstud' element={<Addstud/>}/>
  <Route path='/editstud/:id' element={<Editstud/>}/>
  <Route path='/viewstud' element={<Viewstud/>}/>
 </Routes>
 </Main>
 </BrowserRouter>
 </div>  
  );
}

export default App;
