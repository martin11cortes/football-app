import './App.css';

function App() {
  return (
    <div className="App">
      <input type="datetime" name="date" placeholder="Date"/>
      <input type="text" placeholder="Address" />
      <select name="matchType">
        <option value="">Type</option>
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="11">11</option>
      </select>
    </div>
  );
}

export default App;
