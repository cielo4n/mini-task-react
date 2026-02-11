import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import { HashRouter } from 'react-router-dom'
import AppRoutes from '@/router'
import { Toast } from './components/Toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes/>
      <Toast/>
    </BrowserRouter>
  </StrictMode>
)
