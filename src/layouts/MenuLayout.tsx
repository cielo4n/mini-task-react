import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function MenuLayout(){
    const logout = useAuthStore(state=>state.logout);

    return (
        <div>
            <div style={{fontSize:'0.8em', textAlign:'right'}} >
                <button onClick={() => logout()}>로그아웃</button>
            </div>
            <Outlet/>
        </div>
    );
}