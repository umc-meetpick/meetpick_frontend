import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MyPage from "./pages/My";
import MatchingPage from "./pages/Matching";
import RootLayout from "./layout/root-layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="matching" element={<MatchingPage />} />
          <Route path="my" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
