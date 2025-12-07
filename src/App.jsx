import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter basename="/frontend-eventease/">  {/* <-- add this */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<div>Event Details Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
