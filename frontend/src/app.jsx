// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import NewPlaylistPage from './pages/NewPlaylistPage/NewPlaylistPage';

function App() {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="/playlists/new" element={<NewPlaylistPage />} />
    </Routes>
  );
}

export default App;
