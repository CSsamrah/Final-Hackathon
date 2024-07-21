import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, TextField } from '@mui/material';
import './sidebar.css';

export default function Sidebar() {
    const [className, setClassName] = React.useState('');
    const [students, setStudents] = React.useState('');
    const [points, setPoints] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [topic, setTopic] = React.useState('');

    const handleChange = (event, setState) => {
        setState(event.target.value);
    };

    return (
        <div className="sidebar">
            <FormControl variant="outlined" className="form-control">
                <InputLabel>Class</InputLabel>
                <Select
                    value={className}
                    onChange={(e) => handleChange(e, setClassName)}
                    label="Class"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="hackathonA">Hackathon A</MenuItem>
                    <MenuItem value="hackathonB">Hackathon B</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" className="form-control">
                <InputLabel>Students</InputLabel>
                <Select
                    value={students}
                    onChange={(e) => handleChange(e, setStudents)}
                    label="Students"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="allStudents">All Students</MenuItem>
                    <MenuItem value="groupA">Group A</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" className="form-control">
                <InputLabel>Points</InputLabel>
                <Select
                    value={points}
                    onChange={(e) => handleChange(e, setPoints)}
                    label="Points"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" className="form-control">
                
                <TextField
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    label="Due Date"
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormControl variant="outlined" className="form-control">
                {/* <InputLabel>Topic</InputLabel> */}
                <TextField 
                    placeholder="Topic"
                    id="fullWidth"
                    multiline
                    variant="outlined">
                </TextField>
            </FormControl>
        </div>
    );
}
