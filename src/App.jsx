 my-new-branch
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

import React from "react" 

function App() {
  
  return (
    <>
    <h1 className="text-blue-500">eventease</h1>
    </>
  )
}

export default App
 dev
