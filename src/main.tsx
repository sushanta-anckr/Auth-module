import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_51Pasv8RsaIimtk2XwWtrjd9kYRP7CofzORAl5drehfEO5mKl1uyFqcGgZnX8MXsazDRdpDw869V1RHGqpe6sugm700s2R11iXR')


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
   <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
)
