import './App.css';
import Login from './screens/login';
import SignUp from './screens/signUp';
import Home from './screens/Home';
import Dashboard from './screens/dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom"
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/js/src/carousel'
import '../node_modules/bootstrap/js/src/base-component'
import { useEffect } from 'react';
// const ProtectedRoute = ({
//   user,
//   redirectPath = '/',
//   children,
// }) => {
//   if (user && user.role && user.role == 'admin') {
//     console.log('Hello World')
//     return <Navigate to='/dashboard'  replace/>;
//   }

//   return  <Navigate to='/' />;
// };
function App() {
  // const user = JSON.parse(localStorage.getItem('loginData'));
  // useEffect(()=>{},[])
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route element={<ProtectedRoute user={user} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route> */}
            {/* <Route
          path="dashboard"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && user.roles && user.role == 'admin'}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
