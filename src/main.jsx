import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider, LocationProvider, VisibilityProvider } from './context/contextApi.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <LocationProvider>
        <App />
        <Toaster />
      </LocationProvider>
    </Provider>,
  {/* </React.StrictMode>, */}
)
