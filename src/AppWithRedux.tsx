import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

import {AddItemForm} from './AddItemForm';


import {v1} from "uuid";
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask=useCallback((id: string, todolistId: string)=> {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch])

    const addTask=useCallback((title: string, todolistId: string)=> {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string)=> {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    },[dispatch])

    const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    },[dispatch])

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=> {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {
        dispatch(removeTodolistAC(id))
    },[dispatch])

    const changeTodolistTitle=useCallback((id: string, title: string)=> {
        dispatch(changeTodolistTitleAC(id, title))
    },[dispatch])

    const addTodolist=useCallback((title: string)=> {
        const action = addTodolistAC(title)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
