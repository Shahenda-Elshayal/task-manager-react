import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function Tasks({ task }) {

    const { tasks, setTasks } = useContext(TodoContext);

    function handleCheckButton() {
        const newOne = tasks.map((t) =>
            t.id === task.id ? { ...t, isComplete: !t.isComplete } : t
        )
        setTasks(newOne);
        localStorage.setItem("todo", JSON.stringify(newOne));
    }

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editTask, setEditTask] = useState({ title: task.title, details: task.details });

    function handleDelete() {
        setOpenDelete(true)
    }
    function handleEdit() {
        setOpenEdit(true)
    }

    function handleCloseDelete() {
        setOpenDelete(false)
    }
    function handleCloseEdit() {
        setOpenEdit(false)
    }

    function handleDeleteConfirm() {
        const updatedTask = tasks.filter((t) => {
            return t.id !== task.id;
        })
        setTasks(updatedTask);
        localStorage.setItem("todo", JSON.stringify(updatedTask));
    }

    function handleEditConfirm() {
        const updatedValue = tasks.map((t) => {
            if (t.id === task.id) {
                return { ...t, title: editTask.title, details: editTask.details }
            }
            else
                return t
        })
        setTasks(updatedValue);
        setOpenEdit(false)
        localStorage.setItem("todo", JSON.stringify(updatedValue));
    }

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
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Task title"
                        type="text"
                        value={editTask.title}
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setEditTask({ ...editTask, title: e.target.value })
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        label="Task details"
                        type="text"
                        value={editTask.details}
                        fullWidth
                        variant="standard"
                        style={{ marginTop: "10px" }}
                        onChange={(e) => {
                            setEditTask({ ...editTask, details: e.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEditConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog for edit */}

            <Box sx={{ flexGrow: 1, flexDirection: "column", }} className="task-card">
                <Grid container spacing={0} className="inner-card" sx={{
                    marginTop: "20px",
                    backgroundColor: "#FFF2F7",
                    border: "2px solid #5fa1e7",
                    borderRadius: "6px",
                    transition: "0.2s",
                    // flexDirection: { xs: "column", sm: "row" }
                }}>
                    <Grid size={8}

                    // sx={{ width: { xs: "100%" } }}
                    >
                        <Box component="section" sx={{
                            p: { sm: 2, xs: "12px 12px 10px" },
                            textAlign: "left", fontSize: "22px", color: "#1f2732",
                            borderRight: "2px solid #5fa1e7",
                        }}>
                            <h5 style={{ fontWeight: "normal" }}>
                                {task.title}
                            </h5>
                            <p style={{ fontSize: "14px", marginTop: "5px", color: "#4a4f5a", }}>
                                {task.details}
                            </p>
                        </Box>
                    </Grid>

                    {/* start icons grid */}
                    <Grid size={4} sx={{
                        display: "flex", justifyContent: "center", gap: { xs: "6px", sm: "10px" }, alignItems: "center",
                        // paddingBottom: { xs: "10px", sm: "0" },
                        // width: { xs: "100%" }
                    }}>

                        {/* start check button */}
                        <IconButton className={task.isComplete ? "icon-button completed" : "icon-button"}
                            sx={{
                                backgroundColor: "white",
                                color: "#00882a",
                                borderRadius: "50%",
                                padding: { xs: "3px", sm: "6" },
                                border: "3px solid #00882a",
                                transition: ".2s"
                            }}
                            onClick={handleCheckButton}
                        >
                            <CheckIcon sx={{
                                fontSize: {
                                    xs: "15px",
                                    sm: "22px",
                                },
                            }} />
                        </IconButton>
                        {/* end check button */}


                        <IconButton className="icon-button" sx={{
                            backgroundColor: "white",
                            color: "#2176d7",
                            borderRadius: "50%",
                            padding: { xs: "3px", sm: "6" },
                            border: "3px solid #2176d7",
                            transition: "0.2s"
                        }}
                            onClick={handleEdit}
                        >
                            <EditOutlinedIcon sx={{
                                fontSize: {
                                    xs: "15px",
                                    sm: "22px",
                                },
                            }} />
                        </IconButton>

                        <IconButton className="icon-button" sx={{
                            backgroundColor: "white",
                            color: "#eb3833",
                            borderRadius: "50%",
                            padding: { xs: "3px", sm: "6" },
                            border: "3px solid #eb3833",
                            transition: " 0.2s"
                        }}
                            onClick={handleDelete}
                        >
                            <DeleteOutlineOutlinedIcon sx={{
                                fontSize: {
                                    xs: "15px",
                                    sm: "22px",
                                }
                            }} />
                        </IconButton>
                        {/* end icons grid */}

                    </Grid>

                </Grid>
            </Box>
        </>
    );
}
