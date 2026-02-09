import { useTaskStore } from "@/store/useTaskStore";
import type { Task } from "@/types/task";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks(){
    const tasks = useTaskStore((state)=> state.tasks);
    const fetchTasks = useTaskStore((state)=> state.fetchTasks);
    const createTask = useTaskStore((state)=>state.createTask);
    const deleteTask = useTaskStore((state)=>state.deleteTask);
    const navigate = useNavigate();

    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

    console.log("-- re");

    useEffect(()=>{
        console.log('-- useEffect');
        fetchTasks();
    }, [])

    const handleAdd = ()=>{
        if(!inputRef.current) return;
        const value = inputRef.current.value;
        createTask({
            id: Date.now(),
            title: value,
            status: 'TODO',
        } as Task);
        inputRef.current.value= '';
    }

    const handleFilter = (text: 'ALL' | 'TODO' | 'IN_PROGRESS' | 'DONE') => {
        if(!text) return;
        setSelectedFilter(text);
    }

    const handleDelete= (id: number) => {
        deleteTask(id);
    }

    return (<>
        <div>Tasks...</div>
        <div style={{width: 400, display:'flex', flexDirection: 'column', gap:5}}>
            <div style={{display:'flex', justifyContent: 'center', gap: 5}}>
                <button onClick={()=>handleFilter('ALL')}>ALL</button>
                <button onClick={()=>handleFilter('TODO')}>TODO</button>
                <button onClick={()=>handleFilter('IN_PROGRESS')}>IN_PROGRESS</button>
                <button onClick={()=>handleFilter('DONE')}>DONE</button>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', gap:5}}>
                <input  style={{flexGrow:1}} type="text" ref={inputRef}/>
                <button style={{width:60}} onClick={handleAdd}>추가</button>
            </div>
            <div>
                <div style={{textAlign:'left'}}>Task List</div>
                {tasks.map((task: Task)=>{
                    if(selectedFilter == 'ALL' || selectedFilter == task.status){
                        return (<div style={{display:'flex', flexDirection: 'column', alignItems: 'flex-start'}} key={task.id}>
                        <div><span>{task.title}</span> <span>({task.status})</span></div>
                        <div style={{display:'flex', gap:5, fontSize: '0.7em', marginLeft:15}}>
                            <button onClick={()=>navigate(`/tasks/${task.id}`)}>상세</button>
                            <button onClick={()=>handleDelete(task.id)}>삭제</button>
                        </div>
                        </div>);
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    </>);
}