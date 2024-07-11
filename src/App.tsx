/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ImagePicker from './pages/ImagePicker';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import store from './app/store';
import { loadUser } from './features/users/userSlice';
import { messaging, onForegroundMessage } from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import { vapidKey } from './service/service';

import { getToken } from "firebase/messaging";
import Notify from './pages/Notify';
import { toast, ToastContainer } from 'react-toastify';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';

function App() {

  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);
    // const incognito = 
  // const real = eHhEHd18z9mdxl9DoAt2Gq:APA91bF3wNgKiX7GoxFhEcxgs_XQf9Od4itXpEtaHWhxmr0ltkuyONTQ3zfgux_3mM4aZkuiJV7ZErkKyNbwrPYXGFnuiQeMUfYekxvtKwocvYc_iicoSF6zHFrW14-Bl45jSWDYgdhK


  useEffect(()=>{
    store.dispatch(loadUser())
  })

  useEffect(()=>{
    const requestPermission=async()=>{
        try {
          // if (!('Notification' in window)) {
          //   console.log('This browser does not support notifications.');
          //   return;
          // }
          const permission = await Notification.requestPermission();
          
          if(permission==="granted"){
            const token = await getToken(messaging,{vapidKey:`${vapidKey}`})
            if(token){
              setFirebaseToken(token);
              // console.log('FCM Token:', token);
            }else{
              console.error('Failed to get FCM token')
            }
          }else{
            console.error('Notification permission denied');
          }
        } catch (error) {
          console.error('An error occurred while retrieving FCM token', error);
        }
    }

    requestPermission()

  },[])


  useEffect(()=>{
    onForegroundMessage()
    .then((payload)=>{
      console.log('Received foreground message: ', payload);
        const { notification: { title, body } } = payload;
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch(err => console.log('An error occured while retrieving foreground message. ', err));
  }, []);

  const ToastifyNotification = ({title,body})=>(
    <div className="push-notification">
      <h2 className="push-notification-title">{title}</h2>
      <p className="push-notification-text">{body}</p>
    </div>
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />} />
         <Route element={<ProtectedRoute />} >
         <Route path='' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/image-picker' element={<ImagePicker />} />
              <Route path='/notification' element={<Notify />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/paymentsuccess' element={<PaymentSuccess />} />
              <Route path='/paymentfail' element={<PaymentFail />} />
          </Route>
         </Route>
        </Routes>
      </Router>
      <ToastContainer hideProgressBar />
    </>
  )
}

export default App;
