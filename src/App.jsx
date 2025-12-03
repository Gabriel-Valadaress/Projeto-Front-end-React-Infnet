import HomePage from "./pages/HomePage";
import TournamentsPage from "./pages/TournamentsPage";
import PlayersPage from "./pages/PlayersPage";
import ProfilePage from "./pages/ProfilePage";

import { Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/torneios" element={<TournamentsPage />} />
        <Route path="/jogadores" element={<PlayersPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
  );
}