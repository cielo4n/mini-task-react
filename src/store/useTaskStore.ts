import { create } from "zustand";
import type { Task } from '@/types/task'
import * as api from '@/api/mockApi';

type TaskStore = {
    isLoggedIn: boolean;
    tasks: Task[];
    login: (loginId: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchTasks: () => Promise<void>;
    createTask: (task: Task) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get)=>({
    isLoggedIn: false,
    tasks: [],

    login: async (loginId: string, password: string) => {
        const rst = await api.loginApi(loginId, password);
        if(rst == true){
            set({ isLoggedIn: true});
        }
    },
    logout: async () => {
        const rst = await api.logoutApi();
        if(rst == false){
            set({isLoggedIn: false});
        }
    },
    fetchTasks: async () => {    
        const rst = await api.fetchTasksApi();
        set({tasks: rst});
    },
    createTask: async (task) => {
        await api.createTaskApi(task);
        get().fetchTasks();
    },
    updateTask: async (task) => {    
        await api.updateTaskApi(task);
        get().fetchTasks();
    },
    deleteTask: async (id) => {    
        await api.deleteTaskApi(id);
        get().fetchTasks();
    }
}));
