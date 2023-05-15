import {combineReducers, compose, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})
export type AppRootState=ReturnType<typeof rootReducer>
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store=createStore(rootReducer,composeEnhancers())
// @ts-ignore
window.store=store