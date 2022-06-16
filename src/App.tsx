import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import Matches from './components/Matches';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const divStyle = {
  display: "flex",
  flexFlow: "column wrap",
  alignContent: "space-around",
  gap: "2vh",
  margin: "5%"
};

const players = [
  { label: 'Ronaldinho' },
  { label: 'Messi' },
  { label: 'Cristiano' },
  { label: 'Neymar' }
];

function App() {
  const { register, handleSubmit } = useForm();
  const [when, setWhen] = React.useState<Date | null>(new Date());

  const onSubmit = (data) => {
    console.log(data);
    axios.post("https://3jgliispfg.execute-api.us-east-1.amazonaws.com/dev/matches", { data })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  return (
    <>
      <div className="App">
        <h1>Create match</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={divStyle}>
          <TextField label="Name" type={"text"} variant="outlined" {...register("name")} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField variant="outlined" {...props} />}
              label="When"
              value={when}
              onChange={(newValue) => {
                setWhen(newValue);
              }}
            />
          </LocalizationProvider>
          <TextField label="Where" type={"text"} variant="outlined" {...register("field")} />
          <FormControl fullWidth>
            <InputLabel id="match-type">Match type</InputLabel>
            <Select labelId="match-type" label="Match type" value={8} {...register("matchType")}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={11}>11</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            multiple
            limitTags={5}
            options={players}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Players" placeholder="Players" />
            )}
            sx={{ width: '500px' }}
          />
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </div>
      {/* <Matches /> */}
    </>
  );
}

export default App;
