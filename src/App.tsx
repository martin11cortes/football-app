import axios from 'axios';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './App.css';
import Matches from './components/Matches';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Autocomplete, Button, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import MyAutocomplete from './components/Autocomplete';

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
  // const { register, handleSubmit } = useForm();
  const [when, setWhen] = React.useState<Date | null>(new Date());
  const [type, setType] = React.useState("");
  const [localTeam, setLocalTeam] = React.useState([]);
  const [visitorTeam, setVisitorTeam] = React.useState([]);

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      when: new Date(),
      where: '',
      matchType: '',
      localTeam: [],
      visitorTeam: [],
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    // axios.post("https://3jgliispfg.execute-api.us-east-1.amazonaws.com/dev/matches", { data })
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.data);
    //   });
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    console.log('asdasds');

    setType(event.target.value as string);
  };

  return (
    <>
      <div className="App">
        <h1>Create match</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={divStyle}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <TextField
                {...field}
                label="Name"
                type={"text"}
                helperText="Required"
                error={!errors?.name}
                variant="outlined" />
            }
          />
          <Controller
            name="when"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
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
            }
          />
          <Controller
            name="where"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Where" type={"text"} variant="outlined" {...field} />}
          />
          <Controller
            name="matchType"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <FormControl fullWidth>
                <InputLabel id="match-type">Match type</InputLabel>
                <Select
                  labelId="match-type"
                  {...field}
                  value={type}
                  label="Match type"
                  onChange={handleChangeType}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                </Select>
              </FormControl>}
          />
          <Controller
            name="localTeam"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <Autocomplete
                multiple
                limitTags={5}
                freeSolo
                {...field}
                value={localTeam}
                onChange={(event, newValue) => {
                  setLocalTeam([...newValue]);
                }}
                options={players.map((option) => option["label"])}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Local Team"
                    placeholder="Players"
                  />
                )}
              />}
          />

          <Controller
            name="visitorTeam"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <MyAutocomplete field={field} value={visitorTeam} options={players} />
            }
          />
          {errors?.visitorTeam && <p>This field is required</p>}
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </div>
      {/* <Matches /> */}
    </>
  );
}

export default App;
