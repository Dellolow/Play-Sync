import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import PlayListPage from '../PlaylistListPage/PlaylistListPage';
import NewPlaylistPage from '../NewPlaylistPage/NewPlaylistPage';
import PlaylistDetailPage from '../PlaylistDetailPage/PlaylistDetailPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playlists" element={<PlayListPage />} />
            <Route path="/playlists/new" element={<NewPlaylistPage />} />
            <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}
