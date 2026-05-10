import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import {store} from './reducer/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
  position="top-center"
  autoClose={2000}
  // reverseOrder={false}
/>
<Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
