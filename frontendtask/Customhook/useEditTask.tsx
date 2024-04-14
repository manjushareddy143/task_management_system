import { useState, useEffect ,ChangeEvent, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const UPDATE_TASK = gql`
mutation UpdateTask($id: ID!, $taskname: String!, $taskdescription: String!, $priority: String!, $duedate: String!) {
  updatetask(
    id: $id,
    taskname: $taskname,
    taskdescription: $taskdescription,
    priority: $priority,
    duedate: $duedate
  ) {
    taskname
    taskdescription
    priority
    duedate
  }
}
`;

export function useEditTask() {
    const router = useRouter();
    const { taskId, taskname, taskdescription, priority, duedate } = router.query;

    const [taskData, setTaskData] = useState({
        taskname: taskname || '',
        taskdescription: taskdescription || '',
        priority: priority || '',
        duedate: duedate || ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const [updateTask, { loading, error }] = useMutation(UPDATE_TASK, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        },
        onCompleted: () => {
            setSnackbarOpen(true);
            setTimeout(() => {
                setSnackbarOpen(false);
                router.push('/taskListPage'); 
            }, 3000);
        },
        onError: (error) => {
            console.error("Error updating task:", error);
        }
    });

    useEffect(() => {
        setTaskData({
            taskname: taskname || '',
            taskdescription: taskdescription || '',
            priority: priority || '',
            duedate: duedate || ''
        });
    }, [taskname, taskdescription, priority, duedate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateTask({
            variables: {
                id: taskId,
                ...taskData
            }
        });
    };

    return {
        taskData,
        handleChange,
        handleSubmit,
        snackbarOpen,
        setSnackbarOpen,
        loading,
        error
    };
}
