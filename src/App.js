import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import UserDisplay from "./Components/UserDisplay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="users_data" element={<UserDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
