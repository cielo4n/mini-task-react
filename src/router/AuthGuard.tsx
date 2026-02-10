import { Outlet, Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

export default function AuthGuard() {
    const isLoggedIn = useAuthStore(state=>state.isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Navigate to="/login" />
}
