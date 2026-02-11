import { useState, useEffect, useRef } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import type { Task } from "@/types/task";
import { TaskItem } from "@/components/TaskItem";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useToastStore } from "@/store/useToastStore";

export default function Tasks(){
    const tasks = useTaskStore(state=>state.tasks);
    const fetchTasks = useTaskStore(state=>state.fetchTasks);
    const createTaskOptimistic = useTaskStore(state=>state.createTaskOptimistic);
    const deleteTaskOptimistic = useTaskStore(state=>state.deleteTaskOptimistic);
    const show = useToastStore.getState().show;

    const { error, validate } = useTaskForm();

    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

    console.log("-- re");

    useEffect(()=>{
        console.log('-- useEffect');
        fetchTasks();
    }, [])

    const handleAdd = async ()=>{
        if(!inputRef.current) return;
        const title = inputRef.current.value;

        if(validate(title)){
            try{
                await createTaskOptimistic({
                    id: Date.now(),
                    title: title,
                    status: 'TODO',
                } as Task);
                inputRef.current.value= '';
                show('추가성공', 'success')

            } catch(e){
                show('추가실패', 'error')
                console.log(e);
            }
        }
        
    }

    const handleFilter = (text: 'ALL' | 'TODO' | 'IN_PROGRESS' | 'DONE') => {
        if(!text) return;
        setSelectedFilter(text);
    }

    const handleDelete= async (id: number) => {
        try{
            await deleteTaskOptimistic(id);
            show('삭제성공', 'success')
        } catch(e){
            show('삭제실패', 'error')
            console.log(e);
        }
    }

    return (<>
        <div>React Tasks...</div>
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
            <div style={{color:'red', fontSize:'0.7em'}}>{error}</div>
            <div>
                <div style={{textAlign:'left'}}>Task List</div>
                {tasks.map((task: Task)=>{
                    if(selectedFilter == 'ALL' || selectedFilter == task.status){                        
                        return <TaskItem task={task} handleDelete={handleDelete} key={task.id}/>
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    </>);
}