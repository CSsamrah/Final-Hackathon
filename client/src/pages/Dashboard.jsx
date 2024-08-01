import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

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
  { id: 1, name: 'Introduction to Programming Assignment 1', deadline: '2023-06-30', submit: 'UPLOAD' },
  { id: 2, name: 'Data Structures and Algorithms Assignment 2', deadline: '2023-07-14', submit: 'UPLOAD' },
  { id: 3, name: 'Assignment 3', deadline: '2023-07-28', submit: 'UPLOAD' },
];

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bolder', padding: '10px 20px' }}>
        Current Assignments
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
              <TableCell>Id</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Submit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.id}</TableCell>
                <TableCell>{assignment.name}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell>
                  <Button variant="contained" style={{ background: "white", color: "#0D6DB7", border: "none", boxShadow: "none", fontWeight: "bold" }}>
                    <Link to="/assignmentsubmission">{assignment.submit}</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className='dashboard'>
        <Header className='header' />
        <AssignmentsPage />
      </div>

    </>
  );
};

export default Dashboard;
