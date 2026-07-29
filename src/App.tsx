import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Bio from "./pages/Bio";
import SelectedWork from "./pages/SelectedWork";
import Graveyard from "./pages/Graveyard";

const INTRO_KEY = "intro-seen";

export default function App() {
  const location = useLocation();
  const isGraveyard = location.pathname.startsWith("/graveyard");
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem(INTRO_KEY) === "true"
  );

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "true");
    setIntroDone(true);
  };

  const headerVisible = introDone || location.pathname !== "/";

  return (
    <div
      className="app-root"
      data-theme={isGraveyard ? "graveyard" : undefined}
    >
      <div className="grain" aria-hidden="true" />
      <Header visible={headerVisible} />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                introDone={introDone}
                onIntroComplete={handleIntroComplete}
              />
            }
          />
          <Route path="/bio" element={<Bio />} />
          <Route path="/selected-work" element={<SelectedWork />} />
          <Route path="/graveyard" element={<Graveyard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
