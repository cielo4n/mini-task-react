import { StrictMode, type JSX } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from '@/pages/Login.tsx'
import Tasks from '@/pages/Tasks.tsx'
import TaskDetail from '@/pages/TaskDetail.tsx'
import { useTaskStore } from './store/useTaskStore.ts'

const Guard = function({ children }: { children: JSX.Element}){
  const isLoggedIn = useTaskStore(s=>s.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login"/>
}

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Guard><Tasks /></Guard>} />
        <Route path="/tasks/:id" element={<Guard><TaskDetail /></Guard>} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
