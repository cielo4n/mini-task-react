import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect, useRef, useState } from "react";
import { updateTaskApi } from "@/api/mockApi";
import type { Task } from "@/types/task";

export default function TaskDetail(){
    let { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const fetchTasks = useTaskStore(state=>state.fetchTasks);
    const updateTask = useTaskStore(state=>state.updateTask);
    const tasks = useTaskStore(state=>state.tasks);
    const task = tasks.find((it) => (String)(it.id) === id);
    console.log("-- re2");
    
    useEffect(()=>{
        console.log("-- useEffect2")
        if(tasks.length === 0){
            fetchTasks();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as Task['status'];
        if(task){
            updateTask({
                ...task,
                status: newStatus
            });
        }
    }

    return (
        <>
            <div>Task Detail... {id}</div>
            {task && 
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
            }
            <div style={{textAlign:'right' as const}}>
                <button style={{fontSize: '0.7em'}} onClick={()=>navigate('/tasks')}>목록</button>
            </div> 
        </>
    )
}