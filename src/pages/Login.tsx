import { useAuthStore } from "@/store/useAuthStore";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskForm } from "@/hooks/useTaskForm";

export default function Login(){
    const navigate = useNavigate();
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const login = useAuthStore(state=>state.login);
    const isLoading = useAuthStore(state=>state.isLoading);
    
    const { error, validate } = useTaskForm();

    const handleLogin = async() => {
        if(!loginRef.current || !passwordRef.current){
            return;
        }
        if(!validate(loginRef.current.value)){
            return;
        }
        if(!validate(passwordRef.current.value)){
            return;
        }

        console.log(loginRef.current.value, passwordRef.current.value);
        await login(loginRef.current.value, passwordRef.current.value);
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
        {error &&
        <div style={{fontSize:'0.7em', color: 'red'}}>{error}</div>
        }
        {isLoading && 
        <div style={{fontSize:'0.7em', color: 'blue'}}>로딩중...</div>
        }
        <div style={{display:"flex", justifyContent: "end"}}>
            <button onClick={handleLogin}>로그인</button>
        </div>
    </div>
    </>)
}