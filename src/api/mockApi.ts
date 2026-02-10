import type { Task } from '@/types/task';

let tasks: Task[] = [
    {id: 1, title: 'task 1', description: 'desc 1', status: 'TODO'},
    {id: 2, title: 'task 2', description: 'desc 2', status: 'IN_PROGRESS'}
]

export const loginApi = (loginId: string, password: string) => {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(()=>{ 
            resolve(true);
        }, 500);
    });
};

export const logoutApi = () => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(()=>{ 
            resolve();
        }, 500);
    });
};

export const fetchTasksApi = () => {
    // async 붙임 (Promise resolve 호출)
    // executor : (resolve, reject) => {}
    return new Promise<Task[]>((resolve, reject) => {
        setTimeout(()=>{ 
            resolve([...tasks]);
        }, 500)
    });
};

export const createTaskApi = (task: Task)=>{
    return new Promise<void>((resolve, reject)=>{
        setTimeout(()=>{
            tasks = [...tasks, task]; // tasks.push(task) 보다 참조가 바뀌어서 선호함
            resolve(); 
        }, 500);
    })
};

export const updateTaskApi = (task: Task)=>{
    return new Promise<void>((resolve, reject) => {
        setTimeout(()=>{
            tasks = tasks.map((item) => (task.id == item.id)? task: item );
            resolve();
        }, 500);
    })
};

export const deleteTaskApi = (id: number)=>{
    return new Promise<void>((resolve, reject) => {
        setTimeout(()=>{
            tasks = tasks.filter((item)=> item.id !== id);
            resolve();
        }, 500);
    })
};