import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Matches from "./components/Matches";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/create" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
