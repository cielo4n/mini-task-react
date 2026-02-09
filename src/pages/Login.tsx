import { useTaskStore } from "@/store/useTaskStore"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const taskStore = useTaskStore();
    const navigate = useNavigate();
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    

    const handleClick = function(){
        if(!loginRef.current){
            return;
        }
        if(!passwordRef.current){
            return;
        }
        console.log(loginRef.current.value, passwordRef.current.value);
        taskStore.login(loginRef.current.value, passwordRef.current.value);
        navigate('/tasks');
    }
    
    return (<>
    <div>
        Login...
    </div>
    <div style={{width: "250px", display:"flex", flexDirection: "column", gap:"5px"}}>
        <div style={{display:"flex", justifyContent: "space-between"}}>
            <div>아이디</div>
            <input type="text" id="loginId" ref={loginRef}/>
        </div>
        <div style={{display:"flex", justifyContent: "space-between"}}>
            <div>비밀번호</div>
            <input type="password" id="password" ref={passwordRef}/>
        </div>
        <div style={{display:"flex", justifyContent: "end"}}>
            <button onClick={handleClick}>로그인</button>
        </div>
    </div>
    </>)
}