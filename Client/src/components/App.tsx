import { Routes, Route } from "react-router-dom";
import SubsForm from "./SubsForm";
import SubsVisualization from "./SubsVisualization";
import Navbar from "./Navbar";
import About from "./About";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/*" element={<SubsForm />} />
        <Route path="/About" element={<About />} />
        <Route path="/SubsVisualization" element={<SubsVisualization />} />
      </Routes>
    </div>
  );
}
