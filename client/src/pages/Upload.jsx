import React from 'react';
import Button from '@mui/material/Button';
import './upload.css';
import Description from '../components/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Sidebar from '../components/SideBar';
import FileLinkUploader from '../components/UploadLink';

export default function Upload() {
    const handleAssign = () => {
        alert('Assignment assigned to students!');
    };

    return (
        <div className="container">
            <div className="header">
                <div className="icondiv"><AssignmentIcon />
                    <h1>Assignment</h1></div>
                <Button variant="contained" className="assign-button" onClick={handleAssign}>
                    Assign
                </Button>
            </div>
            <div className="mainUpload" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: "15px" }}>
                    <Description />
                <Sidebar />
            </div>

        </div>
    );
}
