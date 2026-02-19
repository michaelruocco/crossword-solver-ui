import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PuzzlePage from "./pages/PuzzlePage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puzzle/:puzzleId" element={<PuzzlePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
