import { Link, useParams } from "react-router-dom"
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect } from "react";
import type { Task } from "@/types/task";

export default function TaskDetail(){
    let { id } = useParams<{id: string}>();
    const tasks = useTaskStore(state=> state.tasks);
    const fetchTasks = useTaskStore(state=> state.fetchTasks);
    const updateTask = useTaskStore(state=> state.updateTaskOptimistic);

    const task = tasks.find((it) => (String)(it.id) === id);

    if(!task) return null;
    
    console.log("-- re2");
    
    useEffect(()=>{
        console.log("-- useEffect2")
        if(tasks.length === 0){
            fetchTasks();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(task){
            updateTask({
                ...task,
                status: e.target.value as Task['status']
            });
        }
    }

    return (
        <>
            <div>Task Detail...</div>
            <div style={{width:300, display:'flex', flexDirection: 'column', gap:10, textAlign:'left'}}>
                <div>
                    <div style={{borderBottom:'1px solid lightgray'}}>Title</div>
                    <div>{task.title}</div>
                </div>
                <div>
                    <div style={{borderBottom:'1px solid lightgray'}}>Description</div>
                    <div>{task.description}</div>
                </div>
                <div>
                    <div style={{borderBottom:'1px solid lightgray'}}>Status</div>
                    <select value={task.status} onChange={(e) => handleChange(e)}>
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>
            </div>
            <div style={{textAlign:'right' as const, fontSize:'0.8em'}}>
                <Link to={`/tasks`}>목록</Link>
            </div> 
        </>
    )
}