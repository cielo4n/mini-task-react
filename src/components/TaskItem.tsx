import type { Task } from "@/types/task"
import { Link } from "react-router-dom"

export function TaskItem({ task, handleDelete }: {task: Task, handleDelete: any}){
    return (
    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
            <span>{task.title}</span> <span>({task.status}) </span>
            <span style={{fontSize:'0.7em'}}>
                <Link to={`/tasks/${task.id}`}>상세</Link>
            </span>
        </div>                            
        <div style={{display:'flex', fontSize: '0.7em', marginTop:3}}>
            <button onClick={()=>handleDelete(task.id)}>삭제</button>
        </div>
    </div>
    )
}