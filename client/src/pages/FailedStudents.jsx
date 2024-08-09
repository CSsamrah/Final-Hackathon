import React, { useState, useEffect } from 'react';
import TeacherNavbar from '../components/TeacherNavbar';
import { useParams } from 'react-router-dom';
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

const AssignmentsPageFailed = ({ teacherId }) => {
    const [assignments, setAssignments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const cacheBuster = new Date().getTime();
                console.log(`Fetching assignments for teacherId: ${teacherId}`);
                const response = await fetch(`http://localhost:8000/api/studentsfailed/${teacherId}?cacheBuster=${cacheBuster}`);
                
                console.log(`Response status: ${response.status}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                
                console.log('Fetched assignments:', data);
                setAssignments(data);
            } catch (error) {
                console.log('Error fetching assignments:', error);
            }
        };
    
        fetchAssignments();
    }, [teacherId]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAssignments = assignments.filter((assignment) =>
        assignment.studentsNotSubmitted.some(student =>
            student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        ) || assignment.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder', padding: '10px 20px' }}>
                Failed Assignment
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
                            <TableCell>Student</TableCell>
                            <TableCell>Assignment</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAssignments.map((assignment, index) => (
                            assignment.studentsNotSubmitted.map((student, studentIndex) => (
                                <TableRow key={`${assignment.assignmentId}-${student.studentId}`}>
                                    <TableCell>{index * assignment.studentsNotSubmitted.length + studentIndex + 1}</TableCell>
                                    <TableCell>{student.studentName}</TableCell>
                                    <TableCell>{assignment.assignmentTitle}</TableCell>
                                    <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <span className="failed">Failed</span>
                                    </TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const FailedAssignments = () => {
    const { teacherId } = useParams();
    
    useEffect(() => {
        console.log(`Loaded FailedAssignments component with teacherId: ${teacherId}`);
    }, [teacherId]);

    return (
        <div className='FailedDashboard'>
            <TeacherNavbar />
            <AssignmentsPageFailed teacherId={teacherId} />
        </div>
    );
};

export default FailedAssignments;
