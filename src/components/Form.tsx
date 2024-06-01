import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Alert,
  AlertColor,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  Autocomplete,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import "../App.css";

const divStyle = {
  display: "flex",
  flexFlow: "column wrap",
  alignContent: "space-around",
  gap: "2vh",
  margin: "5%",
};

const matchTypes = [
  { value: 5, label: "5v5" },
  { value: 6, label: "6v6" },
  { value: 7, label: "7v7" },
  { value: 8, label: "8v8" },
  { value: 9, label: "9v9" },
  { value: 10, label: "10v10" },
  { value: 11, label: "11v11" },
];

const libraries: Libraries = ["places"];

function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleClose = (event, reason) => {
    console.log("handleClose", { event, reason });

    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (data) => {
    axios
      .post(
        "https://3jgliispfg.execute-api.us-east-1.amazonaws.com/dev/matches",
        { data }
      )
      .then((response) => {
        console.log(response);
        setMessage("Partido creado correctamente");
        setSeverity("success");
        setOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error al crear el partido");
        setSeverity("error");
        setOpen(true);
      });
  };

  const onLoad = useCallback(
    (autocomplete) => {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log({ newLocation, autocomplete, place });
        setValue("where", place.name || place.formatted_address);
        setValue("geolocation", { lat: newLocation.lat, lng: newLocation.lng });
      });
    },
    [setValue]
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="App">
        <h1>Crear Partido</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={divStyle}>
          {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                type={"text"}
                error={errors?.name?.type === "required"}
                variant="outlined"
              />
            )}
          />
          <Controller
            name={"when"}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="outlined"
                      error={errors?.when?.type === "required"}
                    />
                  )}
                  label="Cuándo"
                  value={value}
                  onChange={onChange}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="matchType"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id="match-type">Tipo de Partido</InputLabel>
                <Select
                  error={errors?.matchType?.type === "required"}
                  labelId="match-type"
                  value={value}
                  defaultValue=""
                  label="Tipo de Partido"
                  onChange={onChange}
                >
                  {matchTypes.map((type, i) => (
                    <MenuItem key={i} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="where"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete onLoad={onLoad}>
                <TextField
                  {...field}
                  fullWidth
                  label="Dónde"
                  type={"text"}
                  error={errors?.name?.type === "required"}
                  variant="outlined"
                />
              </Autocomplete>
            )}
          />
          <Button type="submit" variant="contained">
            Crear
          </Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={() => handleClose}
      >
        <Alert
          onClose={() => handleClose}
          variant="filled"
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Form;
