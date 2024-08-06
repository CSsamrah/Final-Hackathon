import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AssignmentSubmission.css';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';

const AssignmentSubmission = () => {
    const { studentId, assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/particular/${assignmentId}`);
                if (!response.ok) {
                    throw new Error('Assignment not found');
                }
                const data = await response.json();
                setAssignment(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAssignment();
    }, [assignmentId]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileDelete = () => {
        setFile(null);
        setFileUrl('');
        fileInputRef.current.value = null;
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId);
        formData.append('title', assignment.title);

        try {
            const response = await fetch('http://localhost:8000/api/submit', {
                method: 'POST',
                body: formData,
            });

            const contentType = response.headers.get('content-type');
            let result;
            if (contentType && contentType.indexOf('application/json') !== -1) {
                result = await response.json();
            } else {
                result = await response.text();
            }

            if (response.ok) {
                setMessage(result.message || result);
                setFileUrl(result.fileUrl);
            } else {
                setMessage(result.message || 'Error submitting assignment');
            }
        } catch (error) {
            setMessage('Error submitting assignment: ' + error.message);
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!assignment) return <p>Loading...</p>;

    return (
        <div className='mainAssignDiv'>
            <div className="assignment-submission">
                <div className="header1">
                    <button className='crossBtn'>
                        <Link to={`/dashboard/${studentId}`}><AiOutlineClose /></Link>
                    </button>
                    <h2 className='headH1'>Assignment Submission</h2>
                </div>
                <div className="content2">
                    <h3>{assignment.title}</h3>
                    <div className='mainP'>
                        <div className='p1'>
                            <p className='points'>{assignment.points} Points</p>
                        </div>
                        <div className='p2'>
                            <p className='dueDate'>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="description">
                        {assignment.description}
                    </div>
                </div>
            </div>
            <div className="your-work">
                <div className='work1'>
                    <h3>Your work</h3>
                    <p className="status">Missing</p>
                </div>
                <div className='assignBtn'>
                    <form onSubmit={handleSubmit}>
                        <button type="button" className="add-or-create" onClick={handleButtonClick}>ADD OR CREATE</button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        {file && (
                            <div className="file-info">
                                <span>{file.name}</span>
                                <button type="button" className="delete-file" onClick={handleFileDelete}>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        )}
                        <button type="submit" className="mark-as-done">MARK AS DONE</button>
                    </form>
                </div>
                {fileUrl && (
                    <div className="submitted-file">
                        <p>Submitted File: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
                    </div>
                )}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AssignmentSubmission;
