import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToast } from '../contexts/ToastContext';
import { useTodo } from '../contexts/TodoContext';

export default function ToDoList() {

    const [taskType, setTaskType] = useState("all", "completed", "pending")
    const [taskInput, setTaskInput] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const { showHideToast } = useToast();
    const { tasks, dispatch } = useTodo();

    useEffect(() => {
        dispatch({ type: "get" })
    }, [])

    function AddNewTask() {
        dispatch({ type: "added", payload: { reducerTitle: taskInput } })
        setTaskInput("");
        showHideToast("Task successfully added!");
    }

    const completedTask = useMemo(() => {
        return tasks.filter((t) => t.isComplete);
    }, [tasks]);

    const pendingTask = useMemo(() => {
        return tasks.filter((t) => !t.isComplete);
    }, [tasks]);

    let FinalTask = tasks;

    if (taskType === "completed") {
        FinalTask = completedTask;
    }
    else if (taskType === "pending") {
        FinalTask = pendingTask;
    }
    else {
        FinalTask = tasks;
    }

    function handleChange(e) {
        setTaskType(e.target.value);
    }

    // Handlers for Delete Dialog
    function handleOpenDelete(task) {
        setCurrentTask(task);
        setOpenDelete(true);
    }

    function handleCloseDelete(task) {
        setOpenDelete(false);
    }

    function handleDeleteConfirm() {
        dispatch({ type: "deleted", payload: currentTask })
        setOpenDelete(false);
        showHideToast("Task removed successfully.");
    }

    // Handlers for Update Dialog
    function handleCloseEdit() {
        setOpenEdit(false)
    }

    function handleOpenEdit(task) {
        setCurrentTask(task);
        setOpenEdit(true);
    }

    function handleEditConfirm() {
        dispatch({ type: "edited", payload: currentTask })
        setOpenEdit(false)
        showHideToast("Changes saved to your task.");
    }

    const tasksList = FinalTask.map((task) => {
        return (
            <Tasks key={task.id} task={task} openDeleteBtn={handleOpenDelete} openEditBtn={handleOpenEdit} />
        )
    })
    console.log("Task Type:", taskType);
    console.log("Completed Tasks:", completedTask);
    console.log("Pending Tasks:", pendingTask);


    return (
        <>
            {/* Start Dialog for delete */}
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this task?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this task is irreversible. Please confirm if you'd like to proceed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog for delete */}

            {/* Start Dialog for edit */}
            <Dialog
                fullWidth
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit the title and details of your task"}
                </DialogTitle>
                <DialogContent>
                    {currentTask && (
                        <>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                label="Task title"
                                type="text"
                                value={currentTask.title}
                                fullWidth
                                variant="standard"
                                onChange={(e) => {
                                    setCurrentTask({ ...currentTask, title: e.target.value });
                                }}
                            />
                            <TextField
                                autoFocus
                                required
                                label="Task details"
                                type="text"
                                value={currentTask.details}
                                fullWidth
                                variant="standard"
                                style={{ marginTop: "10px" }}
                                onChange={(e) => {
                                    setCurrentTask({ ...currentTask, details: e.target.value });
                                }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEditConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog for edit */}

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