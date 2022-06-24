import { Autocomplete, Chip, TextField } from "@mui/material";


const MyAutocomplete = (props) => {
  const { field, value, options } = props;

  return (
    <Autocomplete
      multiple
      limitTags={5}
      freeSolo
      {...field}
      value={[]}
      // onChange={(event, newValue) => {
      //   setVisitorTeam([...newValue]);
      // }}
      onChange={(_event, data) => field.onChange(data['label'] ?? '')}
      options={options.map((option) => option["label"])}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Visitor Team"
          placeholder="Players"
        />
      )}
    />
  )
}

export default MyAutocomplete;