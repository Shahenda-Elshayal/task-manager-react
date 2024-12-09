import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tasks from './Tasks';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export default function ToDoList() {

    const [taskType, setTaskType] = useState("all", "completed", "pending")

    const [taskInput, setTaskInput] = useState("");

    const { tasks, setTasks } = useContext(TodoContext);

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("todo")
        ))
    }, [])

    function AddNewTask() {
        const newTask = {
            id: uuidv4(),
            title: taskInput,
            details: "",
        }

        const updatedStorage = [...tasks, newTask];
        setTasks(updatedStorage);
        localStorage.setItem("todo", JSON.stringify(updatedStorage) ?? []);
        setTaskInput("");
    }

    const completedTask = tasks.filter((t) => {
        return t.isComplete;
    })
    const pendingTask = tasks.filter((t) => {
        return !t.isComplete;
    })

    let FinalTask = tasks;

    if (taskType === "completed") {
        FinalTask = completedTask;
    }
    else if (taskType === "pending") {
        FinalTask = pendingTask;
    }

    const tasksList = FinalTask.map((task) => {
        return (
            <Tasks key={task.id} task={task} />
        )
    })

    function handleChange(e) {
        setTaskType(e.target.value);
    }

    return (
        <>
            <Container maxWidth="sm" sx={{ textAlign: "center", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card sx={{
                    minWidth: 275, borderTopRightRadius: "70px", borderTopLeftRadius: "70px", backgroundColor: "#FFE5EC",
                    height: "80%",
                    overflow: "auto",
                    width: "100%",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },

                }} >
                    <CardContent>

                        {/* start header sec */}
                        <Typography variant="h2" sx={{ color: "#770054", fontFamily: "title" }}>
                            To Do List
                        </Typography>
                        <Divider />
                        {/* end header sec */}

                        {/* start buttons sec */}
                        <ToggleButtonGroup sx={{ marginTop: "20px", }}
                            color="primary"
                            value={taskType}
                            onChange={handleChange}
                            exclusive
                            aria-label="Platform"
                        >
                            <ToggleButton value="all" sx={{ fontWeight: "500" }}>All Tasks</ToggleButton>
                            <ToggleButton value="completed">Completed</ToggleButton>
                            <ToggleButton value="pending">Pending </ToggleButton>
                        </ToggleButtonGroup>
                        {/* end buttons sec */}

                        {/* start task  cards */}
                        {tasksList}
                        {/* end task  cards */}

                        {/* to add new task button */}
                        <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
                            <Grid container spacing={2}>
                                <Grid size={9}>
                                    <TextField
                                        label="Add a Task"
                                        sx={{ width: "100%" }}
                                        value={taskInput}
                                        onChange={(e) => {
                                            setTaskInput(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid size={3}>
                                    <Button variant="contained"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            fontSize: "20px"
                                        }}
                                        onClick={AddNewTask}
                                        disabled={taskInput.length === 0}
                                    >
                                        Add</Button>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* to end new task button  */}

                    </CardContent>
                </Card>

            </Container>
        </>
    );
}