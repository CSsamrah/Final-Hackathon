import React from 'react';
import './AssignmentSubmission.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const AssignmentSubmission = () => {
    return (
        <div className='mainAssignDiv'>
            <div className="assignment-submission">
                <div className="header1" >
                    <button className='crossBtn'><Link Link to="/dashboard"><AiOutlineClose /></Link></button>
                    <h2 className='headH1'>Assignment Submission</h2>
                </div>
                <div className="content2" >
                    <h3>Intro to React</h3>
                    <div className='mainP'>
                        <div className='p1'>
                            <p className='name'>Alina Waseem</p>
                            <p className='points'>100 Points</p>
                        </div>
                        <div className='p2'>
                            <p className='dueDate'>Due: May 15, 2023</p>
                        </div>
                    </div>
                    <hr />
                    <div className="description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo distinctio quis repellendus maiores quasi natus unde,
                        exercitationem ducimus quod temporibus iste sapiente, eius nemo quam in quo! Amet expedita similique earum, explicabo quos
                        minus doloribus quisquam assumenda repellendus? Iusto, tenetur doloremque! Enim consequatur itaque ipsam laboriosam!
                        Accusantium neque nesciunt quidem.
                    </div>
                </div>
            </div>
            <div className="your-work">
                <div className='work1'>
                <h3>Your work</h3>
                <p className="status">Missing</p>
                </div>
                <div className='assignBtn'>
                <button className="add-or-create">ADD OR CREATE</button>
                <button className="mark-as-done">MARK AS DONE</button>
                </div>
            </div>
        </div>

    );
};

export default AssignmentSubmission;
