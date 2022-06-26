import { Autocomplete, Chip, TextField } from "@mui/material";


const MyAutocomplete = (props) => {
  const { value, onChange, options } = props;

  return (
    <Autocomplete
      multiple
      limitTags={5}
      freeSolo
      value={[]}
      onChange={onChange}
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