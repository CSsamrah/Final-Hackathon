import React, { useState } from 'react';
import Header from '../components/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { FilterList, GetApp } from '@mui/icons-material';

const assignments = [
  { id: 1, course: 'Introduction to Programming', assignment: 'Assignment 1', deadline: '2023-06-30', status: 'Failed' },
  { id: 2, course: 'Data Structures and Algorithms', assignment: 'Assignment 2', deadline: '2023-07-14', status: 'Failed' },
  { id: 3, course: 'Web Development Fundamentals', assignment: 'Assignment 3', deadline: '2023-07-28', status: 'Failed' },
];

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bolder', padding: '10px 20px' }}>
        Failed Assignment
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" startIcon={<FilterList />} style={{ border: 'none', padding: '10px 20px' }}>
          Filters
        </Button>
        <Button variant="outlined" startIcon={<GetApp />} style={{ border: 'none', padding: '10px 20px' }}>
          Export
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ ml: 'auto' }}
          style={{ border: 'none', padding: '10px 20px' }} />
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: '#bfd3e0' }}>
              <TableCell>#</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.id}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.assignment}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell>
                  <span className="failed">{assignment.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const Failed = () => {
  return (
    <>
      <div className='Failed'>
        <Header className='header' />
        <AssignmentsPage />
      </div>

    </>
  );
};

export default Failed;
