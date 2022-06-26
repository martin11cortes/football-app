import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import React from 'react';

interface IMatch {
  id: string;
  when: string;
  where: string;
  matchType: string;
  localTeam: [];
  visitorTeam: [];
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
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">When</TableCell>
            <TableCell align="center">Where</TableCell>
            <TableCell align="center">Match Type</TableCell>
            <TableCell align="center">Local Team</TableCell>
            <TableCell align="center">Visitor Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match, i) => (
            <TableRow key={i}>
              <TableCell align="center">{match.name}</TableCell>
              <TableCell align="center">{format(parseISO(match.when), 'MM/dd/yyyy HH:mm')}</TableCell>
              <TableCell align="center">{match.where}</TableCell>
              <TableCell align="center">{match.matchType}</TableCell>
              <TableCell align="center">{match.localTeam.length}</TableCell>
              <TableCell align="center">{match.visitorTeam.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Matches;