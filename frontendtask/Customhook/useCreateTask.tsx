import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTasks } from './useTasks';

const CREATE_TASK = gql`
  mutation CreateTask($taskname: String!, $taskdescription: String!, $priority: String!, $duedate: String!) {
    createtask(taskname: $taskname, taskdescription: $taskdescription, priority: $priority, duedate: $duedate) {
      id
      taskname
      taskdescription
      priority
      duedate
    }
  }
`;

export function useCreateTask() {
    const [taskData, setTaskData] = useState({
        taskname: '',
        taskdescription: '',
        priority: '',
        duedate: ''
    });
    const { refetch } = useTasks();
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        },
        onCompleted: () => {
            setSnackbarOpen(true);
            refetch();
            setTimeout(() => {
                setSnackbarOpen(false);
                router.push('/taskListPage');
            }, 3000);
        },
        onError: (err) => {
            console.error("Error creating task:", err);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTask({
            variables: taskData
        });
    };

    return {
        taskData,
        handleChange,
        handleSubmit,
        snackbarOpen,
        handleCloseSnackbar: () => setSnackbarOpen(false),
        loading,
        error
    };
}
