import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Tasks from '@/pages/Tasks'
import TaskDetail from '@/pages/TaskDetail'
import Layout from '@/layouts/Layout'
import AuthGuard from '@/router/AuthGuard'
import MenuLayout from '@/layouts/MenuLayout'

export default function AppRoutes(){
    return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/login" element={<Login />} />
            <Route element={<AuthGuard/>}>
                <Route element={<MenuLayout/>}>
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/tasks/:id" element={<TaskDetail />} />                    
                </Route>
            </Route>
            <Route path="/*" element={<Navigate to="/login"/>} />
        </Route>
    </Routes>
    ); 
}

