import React, { useState, useEffect } from 'react';
import { useTasks } from '../Customhook/useTasks';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, 
  useTheme, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import Link from 'next/link';
import { SelectChangeEvent } from '@mui/material/Select';

interface Task {
  id: string;
  taskname: string;
  taskdescription: string;
  priority: string;
  duedate: string;
}

interface SortInput {
  field: string;
  order: string;
}

interface FilterInput {
  priority: string;
}

export default function TaskList() {
  const theme = useTheme();
  const [sort, setSort] = useState<SortInput>({ field: 'priority', order: 'DESC' });
  const [filter, setFilter] = useState<FilterInput>({ priority: '' });
  const [uniquePriorities, setUniquePriorities] = useState<string[]>([]);

  const { loading, error, tasks, refetch } = useTasks(sort, filter);

  useEffect(() => {
    const priorities = tasks.map((task: Task) => task.priority);
    setUniquePriorities(Array.from(new Set(priorities)));
  }, [tasks]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter({ ...filter, priority: event.target.value });
  };

  const applyFilters = () => {
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (tasks.length === 0) return <p>No tasks available.</p>;

  return (
    <div style={{ padding: '0 40px', maxWidth: '100vw', overflowX: 'auto' }}>
      <h2 style={{ textAlign: 'center', color: theme.palette.primary.main }}>Tasks List</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel id="priority-filter-label">Filter by Priority</InputLabel>
        <Select
          labelId="priority-filter-label"
          value={filter.priority}
          onChange={handleFilterChange}
          label="Filter by Priority"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {uniquePriorities.map(priority => (
            <MenuItem key={priority} value={priority}>{priority}</MenuItem>
          ))}
        </Select>
      </FormControl>
 
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Task Id</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.taskname}</TableCell>
                <TableCell>{task.taskdescription}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.duedate}</TableCell>
                <TableCell>
                  <Link href={`/editTaskPage?taskId=${task.id}&taskname=${encodeURIComponent(task.taskname)}&taskdescription=${encodeURIComponent(task.taskdescription)}&priority=${task.priority}&duedate=${task.duedate}`}>
                    EDIT
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
