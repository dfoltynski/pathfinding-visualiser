import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Navbar, Legend, Grid } from "./components";
import { algorithmContext } from "./components/Context/Context";

import "./App.css";

function App() {
  const [algorithm, setAlgorithm] = useState<string>("");

  return (
    <div className="App">
      <algorithmContext.Provider value={{ algorithm, setAlgorithm }}>
        <Navbar />
      </algorithmContext.Provider>
      <Legend />
      <Grid />
    </div>
  );
}

export default App;
