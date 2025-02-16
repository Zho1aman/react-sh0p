import React from "react";
import { Snackbar, Alert } from "@mui/material";

function AlertToast({ open, handleClose, message }) {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={handleClose} 
            anchorOrigin={{ vertical: "top", horizontal: "right" }} 
            TransitionComponent={undefined} >
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default AlertToast;
