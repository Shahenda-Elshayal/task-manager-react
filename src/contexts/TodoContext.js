import { createContext, useContext, useReducer } from "react";
import { taskReducer } from '../reducers/taskReducer';

const TodoContext = createContext([]);

const initialState = JSON.parse(localStorage.getItem("todo")) || [];

export const TodoProvider = ({ children }) => {

    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TodoContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    return useContext(TodoContext);
}

