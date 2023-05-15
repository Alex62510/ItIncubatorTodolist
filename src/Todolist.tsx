import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button, Checkbox, IconButton} from "@mui/material";
import {FilterValuesType} from "./AppWithReducers";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [])
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[ props.changeTodolistTitle,props.id])
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter,props.id]);
    let tasks = props.tasks;

    useMemo(()=>{
        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    },[props.filter])

    const removeTask = (taskId:string) => props.removeTask(taskId,props.id)
    const changeTaskStatus = (taskId:string,isDone:boolean) => {
        props.changeTaskStatus(taskId, isDone,props.id);
    }
    const changeTaskTitle = useCallback((taskId:string,newValue:string) => {
        props.changeTaskTitle(taskId, newValue,props.id);
    },[props.changeTaskTitle,props.id])



    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => <Task
                    task={t}
                    key={t.id}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    removeTask={removeTask}
                />)
            }
        </div>
        <div>
            <ButtonWithMemo
                title={"All"}
                onClick={onAllClickHandler}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                color={'secondary'}/>
            <ButtonWithMemo
                title={"Active"}
                onClick={onActiveClickHandler}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                color={'secondary'}/>
           <ButtonWithMemo
               title={"Completed"}
               onClick={onCompletedClickHandler}
               variant={props.filter === 'completed' ? 'outlined' : 'text'}
               color={'secondary'}/>
        </div>
    </div>
})
export type ButtonWithMemoPropsType={
    title:string
    onClick:()=>void
    variant:'text' | 'outlined' | 'contained'
    color:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}
const ButtonWithMemo=memo((props:ButtonWithMemoPropsType)=>{
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={'secondary'}>{props.title}
    </Button>
})

