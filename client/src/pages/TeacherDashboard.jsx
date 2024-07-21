import React, { useState } from 'react';
import TeacherNavbar from '../components/TeacherNavbar';
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
  { id: 1, student: 'John Doe', assignment: 'Assignment 1', marks: '86/100', status: 'Good' },
  { id: 2, student: 'Jane Smith', assignment: 'Assignment 2', marks: '96/100', status: 'Excellent' },
  { id: 3, student: 'Sam Brown', assignment: 'Assignment 3', marks: '60/100', status: 'Average' },
];

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder', padding: '10px 20px' }}>
        Submitted Assignment
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" startIcon={<FilterList />} sx={{ border: 'none', padding: '10px 20px' }}>
          Filters
        </Button>
        <Button variant="outlined" startIcon={<GetApp />} sx={{ border: 'none', padding: '10px 20px' }}>
          Export
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ ml: 'auto', padding: '10px 20px' }}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#bfd3e0' }}>
              <TableCell>#</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.id}</TableCell>
                <TableCell>{assignment.student}</TableCell>
                <TableCell>{assignment.assignment}</TableCell>
                <TableCell>{assignment.marks}</TableCell>
                <TableCell>
                  <span className={assignment.status.toLowerCase()}>{assignment.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const TeacherDashboard = () => {
  return (
    <div className='TeacherDashboard'>
      <TeacherNavbar />
      <AssignmentsPage />
    </div>
  );
};

export default TeacherDashboard;