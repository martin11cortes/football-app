import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const divStyle = {
  display: "flex",
  flexFlow: "column wrap",
  alignContent: "space-around",
  margin: "5%"
};

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios.post("https://3jgliispfg.execute-api.us-east-1.amazonaws.com/dev/matches", { data })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  return (
    <div className="App">
      <h1>Create match</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={divStyle}>
        <input type="date" placeholder="Date" {...register("date")} />
        <input type="text" placeholder="field" {...register("field")} />
        <select {...register("matchType")}>
          <option value="">Type</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="11">11</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;
