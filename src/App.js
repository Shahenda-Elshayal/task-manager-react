import './App.css';
import ToDoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './contexts/ToastContext';
import { TodoProvider } from './contexts/TodoContext';

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


function App() {


  return (
    <ThemeProvider theme={theme}>

      <ToastProvider>
        <div className="App" style={{
          backgroundColor: "#FFB3C6", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px",
          background: "linear-gradient(0deg, rgba(255,176,211,1) 3%, rgba(130,165,208,1) 100%)",
          fontFamily: "main",
        }}>

          <TodoProvider>
            <ToDoList />
          </TodoProvider>

        </div>

      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
