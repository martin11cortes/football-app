import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import React from 'react';

interface IMatch {
  id: string;
  date: string;
  field: string;
  matchType: string;
}

const Matches = () => {
  const [matches, setMatches] = React.useState([]);
  React.useEffect(() => {
    axios.get<IMatch[]>("https://3jgliispfg.execute-api.us-east-1.amazonaws.com/dev/matches")
      .then(res => {
        setMatches(res.data["Items"]);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Field</TableCell>
            <TableCell align="right">Match Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {match.id}
              </TableCell>
              <TableCell align="right">{match.date}</TableCell>
              <TableCell align="right">{match.field}</TableCell>
              <TableCell align="right">{match.matchType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Matches;