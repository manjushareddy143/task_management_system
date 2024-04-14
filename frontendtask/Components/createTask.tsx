import React from 'react';
import { Grid, TextField, Button, Paper, Typography, Snackbar, Alert, useTheme } from '@mui/material';
import { useCreateTask } from '../Customhook/useCreateTask';

const CreateTask = () => {
    const theme = useTheme();   
    const {
        taskData,
        handleChange,
        handleSubmit,
        snackbarOpen,
        handleCloseSnackbar,
        loading,
        error
    } = useCreateTask();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Grid container justifyContent="center" style={{ paddingBottom: '40px' }}>  
            <Grid item xs={12} md={6}>
                <Paper style={{ padding: '20px' }}>
                    <Typography variant="h6" gutterBottom>Create Task</Typography>
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
                            sx={{ marginBottom: theme.spacing(2) }}  
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
                            sx={{ marginBottom: theme.spacing(2) }}  
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
                            sx={{ marginBottom: theme.spacing(2) }}   
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
                            sx={{ marginBottom: theme.spacing(2) }}  
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: theme.spacing(2) }}>Create Task</Button>
                    </form>
                </Paper>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Task created successfully!
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default CreateTask;
