import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import './description.css'; // Import the CSS file
import Button from '@mui/material/Button';
import ToggleButtonsMultiple from './ToggleButton';
import FileLinkUploader from './UploadLink';

const ariaLabel = { 'aria-label': 'description' };



export default function Description() {
    return (
        <div className='mainDescription'>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="formBox"
            >
                <Input placeholder="Title" inputProps={ariaLabel} className="titleInput" />
            </Box>
            <Box
                className="descriptionBox"
            >
                <TextField
                    fullWidth
                    placeholder="Instructions (optional)"
                    id="fullWidth"
                    multiline
                    rows={4}
                    variant="outlined"
                    className="descriptionInput"
                />
            </Box>
            <div className="editorToolbar">
            <ToggleButtonsMultiple /> <FileLinkUploader />
            </div>
        </div>
    );
}
