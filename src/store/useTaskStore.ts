import { create } from "zustand";
import type { Task } from '@/types/task'
import * as api from '@/api/mockApi';

type TaskStore = {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    createTaskOptimistic: (task: Task) => Promise<void>;
    updateTaskOptimistic: (task: Task) => Promise<void>;
    deleteTaskOptimistic: (id: number) => Promise<void>;
    createTask: (task: Task) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    isLoading: boolean;
}

export const useTaskStore = create<TaskStore>((set, get)=>({
    tasks: [],
    isLoading: false,

    fetchTasks: async () => {
        set({isLoading: true});
        const data = await api.fetchTasksApi();
        set({tasks: data, isLoading: false});
    },
    // 사용자가 즉각적인 반응을 요구하고, 실패해도 이전값으로 되돌릴수있다면 Optimistic 사용 (선택적)
    createTaskOptimistic: async (task)=> {
        console.log("cn")
        const prev = get().tasks;
        set({tasks: [...prev, task]})

        try{
            await api.createTaskApi(task);           
        } catch (e){
            set({tasks: prev})
            throw e
        }
    },
    updateTaskOptimistic: async (task)=> {
        const prev = get().tasks;
        const next = prev.map((t)=>(t.id === task.id ? task : t));
        set({tasks: next})

        try{
            await api.updateTaskApi(task);
        } catch (e){            
            set({tasks: prev})
            throw e
        }
    },
    deleteTaskOptimistic: async (id)=> {
        const prev = get().tasks;
        const next = prev.filter((t)=>(t.id !== id));
        set({tasks:next});
        try{
            await api.deleteTaskApi(id);
        } catch (e){
            set({tasks: prev})
            throw e
        }
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
