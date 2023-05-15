import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType = {
    taskId: string
    todolistId:string
}
export const TaskWithRedux = memo(({taskId,todolistId}: TaskPropsType) => {

    const task=useSelector<AppRootState,TaskType>(state => state.tasks[todolistId].filter(t=>t.id===taskId)[0] )
const dispatch=useDispatch()


    const removeTask=()=> {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const changeStatus=(e: ChangeEvent<HTMLInputElement>)=> {
        dispatch(changeTaskStatusAC(taskId, e.currentTarget.checked, todolistId))
    }
    const changeTaskTitle=useCallback((newTitle: string)=> {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    },[dispatch,taskId,todolistId])
    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={changeStatus}
            />
            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <DeleteForeverIcon/>
            </IconButton>
        </div>
    );
});

