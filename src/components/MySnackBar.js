import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function MySnackBar({ open, message }) {
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
            >
                <Alert variant="filled" color='primary' severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
