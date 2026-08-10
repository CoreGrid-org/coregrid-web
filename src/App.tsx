import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

import Modules from "./pages/modules";
import AIDecisionSupport from "./pages/AIDecisionSupport";

import Features from "./pages/Features";
import Contact from "./pages/Contact";


export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="modules" element={<Modules/>} />
        <Route path="ai-decision-support" element={<AIDecisionSupport />} />
        <Route path="features" element={<Features />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
