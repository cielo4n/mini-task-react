import { create } from 'zustand'
import { loginApi, logoutApi } from '@/api/mockApi';

type AuthStore = {
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (loginId: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}


export const useAuthStore = create<AuthStore>((set, get) => ({
    isLoggedIn: Boolean(localStorage.getItem('auth')),
    isLoading: false,

    login: async (loginId, password) => {
        set({isLoading: true})
        const rst = await loginApi(loginId, password)
        if(rst == true){
            localStorage.setItem('auth', 'true');
            set({isLoggedIn: true})
        }
        set({isLoading: false})
    },
    logout: async () => {
        await logoutApi();
        localStorage.removeItem('auth');
        set({isLoggedIn: false})
    }
}))