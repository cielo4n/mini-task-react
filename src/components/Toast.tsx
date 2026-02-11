import { useToastStore } from "@/store/useToastStore"

const toastStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    padding:'8px 20px',
    borderRadius: 15,
    color: 'white',
    opacity: 0.9,
    fontSize: '0.8em',
}

const toastTypeStyle = {
    success: { background: '#4caf50' },
    error: { background: '#f44336' },
    info: { background: '#2196f3' }
}


export function Toast(){
    const isVisible = useToastStore(state=>state.isVisible);
    const message = useToastStore(state=>state.message);
    const type = useToastStore(state=>state.type);
    
    if(isVisible){
        return(
            <div style={{...toastStyle, ...toastTypeStyle[type]}}>
                {message}
            </div>
        )
    } else {
        return null;
    }
}