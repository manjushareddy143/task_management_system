import React from 'react';
import { Grid, TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { useEditTask } from '../Customhook/useEditTask'
const EditTaskForm = () => {
    const {
         taskData,
          handleChange,
           handleSubmit,
            snackbarOpen, 
            setSnackbarOpen, 
            loading, 
            error } = useEditTask();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Grid container justifyContent="center" style={{ paddingBottom: '40px' }}>
            <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6" gutterBottom>Edit Task</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            name="taskname"
                            value={taskData.taskname}
                            onChange={handleChange}
                            label="Task Name"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            type="text"
                            name="taskdescription"
                            value={taskData.taskdescription}
                            onChange={handleChange}
                            label="Task Description"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            type="text"
                            name="priority"
                            value={taskData.priority}
                            onChange={handleChange}
                            label="Priority"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            type="text"
                            name="duedate"
                            value={taskData.duedate}
                                onChange={handleChange}
                            label="Due Date"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">Update Task</Button>
                    </form>
                </Paper>
                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                        Task updated successfully!
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};

export default EditTaskForm;
