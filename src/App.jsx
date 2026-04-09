import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import RepoPage from "./pages/RepoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/user/:username" element={<RepoPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
