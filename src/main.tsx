import { StrictMode, type JSX } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from '@/pages/Login.tsx'
import Tasks from '@/pages/Tasks.tsx'
import TaskDetail from '@/pages/TaskDetail.tsx'
import { useTaskStore } from './store/useTaskStore.ts'
import Layout from './layouts/layout.tsx'

const Guard = function({ children }: { children: JSX.Element}){
  const isLoggedIn = useTaskStore(s=>s.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login"/>
}

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Guard><Tasks /></Guard>} />
          <Route path="/tasks/:id" element={<Guard><TaskDetail /></Guard>} />
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
