import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import AgenticAIPage from "./pages/AgenticAIPage";
import Platform from "./pages/Platform";
import Security from "./pages/Security";
import Docs from "./pages/Docs";
import Team from "./pages/Team";
import Roadmap from "./pages/Roadmap";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="agentic-ai" element={<AgenticAIPage />} />
        <Route path="platform" element={<Platform />} />
        <Route path="security" element={<Security />} />
        <Route path="docs" element={<Docs />} />
        <Route path="team" element={<Team />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
