import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Box, Typography } from '@mui/material';
import CourseCard from '../components/Course';

function Dashboard() {
  return (
    <div className='dashboard'>
      <Header className='header'/>
      <Box className='main-content'>
        <Box style={{ marginBottom: '20px' }}>
          <Typography variant="h5" component="div">
            Hi! Samrah Fatima 👋
          </Typography>
          <Typography variant="body1" component="div">
            Welcome to the SMIT student portal. You can find all your courses listed below
          </Typography>
        </Box>
        <CourseCard 
          className='course-card'
          courseName="Web and Mobile App Development"
          batch="10"
          city="Karachi"
          roll="136521"
        />
      </Box>
      <Footer className='footer'/>
    </div>
  )
}

export default Dashboard
