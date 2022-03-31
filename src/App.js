import './App.css';
import { Routes,Route } from 'react-router-dom';
import ManageStudent from './Teacher/ManageStudent';
import PrevAttendance from './Teacher/PrevAttendance';
import ContentPage from './Teacher/ContentPage';
import Register from './Teacher/Register';
import Login from './Teacher/Login';
import HomePage from './Admin/HomePage';
import AdminRegister from './Admin/AdminRegister';
import ManageCourse from './Admin/ManageCourse';
import ManageSemester from './Admin/ManageSemester';
import ManageTeacher from './Admin/ManageTeacher';
function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<ContentPage/>}></Route>
      <Route path='/manageStudent' element={<ManageStudent/>}></Route>
      <Route path='/prevAttendance' element={<PrevAttendance/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    <Routes>
      <Route path='/admin' element={<HomePage/>}></Route>
      {/* <Route path='/admin/login' element={<AdminRegister/>}></Route> */}
      <Route path='/admin/manageCourse' element={<ManageCourse/>}></Route>
      <Route path='/admin/manageSemester' element={<ManageSemester/>}></Route>
      <Route path='/admin/manageTeacher' element={<ManageTeacher/>}></Route>
    </Routes>
   </>
  );
}

export default App;
