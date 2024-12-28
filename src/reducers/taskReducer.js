import { v4 as uuidv4 } from 'uuid';

export function taskReducer(currentState, action) {
    switch (action.type) {
        case "added": {
            const newTask = {
                id: uuidv4(),
                title: action.payload.reducerTitle,
                details: "",
            }

            const updatedStorage = [...currentState, newTask];
            localStorage.setItem("todo", JSON.stringify(updatedStorage));
            return updatedStorage;
        }

        case "deleted": {
            const updatedTask = currentState.filter((t) => {
                return t.id !== action.payload.id;
            })
            localStorage.setItem("todo", JSON.stringify(updatedTask));
            return updatedTask;
        }

        case "edited": {
            const updatedValue = currentState.map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, title: action.payload.title, details: action.payload.details }
                }
                else
                    return t
            })
            localStorage.setItem("todo", JSON.stringify(updatedValue));
            return updatedValue;
        }

        case "get": {
            return JSON.parse(localStorage.getItem("todo")) ?? [];
        }

        case "toggleChecked": {
            const newOne = currentState.map((t) =>
                t.id === action.payload.id ? { ...t, isComplete: !t.isComplete } : t
            )
            localStorage.setItem("todo", JSON.stringify(newOne));
            return newOne;
        }

        default: {
            throw Error("Unknown Action " + action.type);
        }
    }
}
