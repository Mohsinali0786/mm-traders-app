import './App.css';
import Login from './screens/login';
import SignUp from './screens/signUp';
import Home from './screens/Home';
import Dashboard from './screens/dashboard';
import About from './screens/about';
import ContactUs from './screens/contactUs'
import Costing from './screens/costings'
import { CurrencyRates } from './screens/currencyRates';
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
import Navbar from './components/Navbar';
import ProductForms from './screens/productForm';
import { VerifyEmail } from './screens/verifyUser';
import { DusterFabricCalculator } from './components/dusterFabricConsumption';
import HisabKitabForm from './components/hisabKitab/hisabKitabForm';
import PaymentDetails from './components/paymentTable/paymentTable';
import TableUnstyled from './components/tableWithPagination/table';
import InwardData from './screens/inwardData/inwardData';
import { ToastContainer, toast } from "react-toastify";

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
      <Navbar />
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="p-form" element={<ProductForms />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/costings" element={<Costing />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* <Route path="/verify-email" element={<DusterFabricCalculator/>} /> */}
        <Route path="/hisabForm" element={<HisabKitabForm />} />
        <Route path="/inWard" element={<InwardData />} />
        <Route path="/outWard" element={<InwardData />} />

        <Route path='paymentDetail' element={<PaymentDetails />} />


        {/* <Route path="/currencyRates" element={<CurrencyRates/>} /> */}

        {/* <Route path="/addProductCat" element={<ProductCatForm/>} /> */}


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
