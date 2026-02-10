import { useState } from "react";

export function useTaskForm(){
    const [error, setError] = useState<string | null>(null);

    const validate = (value: string)=>{
        if(!value){
            setError("필수입력입니다")
            return false;
        }
        setError(null)
        return true;
    }

    return { error, validate }

}