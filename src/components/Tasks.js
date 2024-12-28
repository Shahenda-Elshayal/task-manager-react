import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useTodo } from '../contexts/TodoContext';


export default function Tasks({ task, openDeleteBtn, openEditBtn }) {

    const { tasks, dispatch } = useTodo()
    const { showHideToast } = useToast();

    function handleCheckButton() {
        dispatch({ type: "toggleChecked", payload: task });

        if (!task.isComplete) {
            showHideToast("Task completed! Great job.");
        }

        else {
            showHideToast("Moved back to pending.");
        }
    }

    const [editTask, setEditTask] = useState({ title: task.title, details: task.details });

    function handleDelete() {
        openDeleteBtn(task)
    }

    function handleEdit() {
        openEditBtn(task)
    }


    return (
        <>
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
