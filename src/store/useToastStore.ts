import { create } from 'zustand'

export type ToastType = 'success'|'error'|'info'

export type ToastStore = {
    isVisible: boolean
    message: string,
    type: ToastType,
    timeoutId: ReturnType<typeof setTimeout> | null,
    show: (message: string, type: ToastType, duration?: number) => void,
    hide: ()=>void,
}

export const useToastStore = create<ToastStore>((set, get)=>({
    isVisible: false,
    message: '',
    type: 'info' as ToastType,
    timeoutId: null,
    show: (message, type, duration=1500)=>{

        set({isVisible: true, message: message, type: type})

        let timeoutId = get().timeoutId;
        if(timeoutId){
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(()=>{
            get().hide();
        }, duration);
        set({timeoutId: timeoutId})
    },
    hide: ()=>{
        set({isVisible: false})
    }
}));