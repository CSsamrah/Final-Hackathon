import React from 'react';
import Button from '@mui/material/Button';
import './upload.css';
import Description from '../components/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Sidebar from '../components/SideBar';
import FileLinkUploader from '../components/UploadLink';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


   

export default function Upload() {
    const { teacherId } = useParams();
    const handleAssign = () => {
        alert('Assignment assigned to students!');
    };

    return (
        <div className="container">
            <div className="header2">
                <div className="icondiv">
                    <button className='crossBtn'>
                        <Link to={`/teacherdashboard/${teacherId}`}><AiOutlineClose /></Link>
                    </button>
                    <AssignmentIcon />
                    <h1>Assignment</h1>
                </div>
                <Button variant="contained" className="assign-button" onClick={handleAssign}>
                    Assign
                </Button>
            </div>
            <div className="mainUpload">
                <Description />
                <Sidebar />
            </div>
        </div>
    );
}
