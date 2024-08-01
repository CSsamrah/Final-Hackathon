import React, { useState } from 'react';
import Header from '../components/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { FilterList, GetApp } from '@mui/icons-material';

const leaderboardData = [
  { id: 1, student: 'John Doe', score: 98 / 100, rank: 1 },
  { id: 2, student: 'Jane Smith', score: 95 / 100, rank: 2 },
  { id: 3, student: 'Sam Brown', score: 93 / 100, rank: 3 },
];

const LeaderboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = leaderboardData.filter((entry) =>
    entry.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bolder', padding: '10px 20px' }}>
        Leaderboard
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
              <TableCell>#</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Rank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.student}</TableCell>
                <TableCell>{entry.score}</TableCell>
                <TableCell>{entry.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const LeaderBoard = () => {
  return (
    <>
      <div className='LeaderBoard'>
        <Header className='header' />
        <LeaderboardPage />
      </div>

    </>
  );
};

export default LeaderBoard;
