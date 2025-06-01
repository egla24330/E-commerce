import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopProvider from './context/Shopcontext.jsx'
import { AuthProvider } from './context/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </AuthProvider>
  </BrowserRouter>
)
