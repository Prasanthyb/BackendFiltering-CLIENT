import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BootcampsPage from "./pages/BootcampsPage";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route  path="/" element={<BootcampsPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;