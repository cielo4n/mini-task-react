import { Outlet } from "react-router-dom";
import '@/styles/global.css';

export default function Layout(){
    return (
        <div>
            <Outlet/>
        </div>
    )
}