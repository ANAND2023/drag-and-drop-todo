
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';
import ProtectedRoute from './Services/ProtectedRoute';
import Apps from './NewToDo/App';

function App() {
  return (
    <>
   
   <BrowserRouter>
   <Routes>
    
    <Route path='/' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/todo' element={<ProtectedRoute/>}>
    
    <Route path='/todo' element={<Apps/>}/>

    </Route>
    

   </Routes>
   </BrowserRouter>
   

   {/* <Apps/> */}
    </>
  );
}

export default App;
