import './App.css';
import ToDoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodoContext } from './contexts/TodoContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  palette: {
    primary: {
      main: `#770054`
    },
    secondary: {
      main: `#dc2f86`
    },
  },
  typography: {
    fontFamily: "main"
  }
});

const initialTasks = [
  {
    id: uuidv4(),
    title: "First task",
    details: "The details of the first task",
    isComplete: false
  },
  {
    id: uuidv4(),
    title: "Second task",
    details: "The details of the second task",
    isComplete: false
  },
  {
    id: uuidv4(),
    title: "Third task",
    details: "The details of the third task",
    isComplete: false
  },
]

function App() {

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <ThemeProvider theme={theme}>
      <TodoContext.Provider value={{ tasks, setTasks }}>
        <div className="App" style={{
          backgroundColor: "#FFB3C6", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px",
          background: "linear-gradient(0deg, rgba(255,176,211,1) 3%, rgba(130,165,208,1) 100%)",
          fontFamily: "main",
        }}>

          <ToDoList />

        </div>
      </TodoContext.Provider>
    </ThemeProvider>
  );
}

export default App;
