// src/pages/NewPlaylistPage/NewPlaylistPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlaylist } from '../../utilities/playlists-api';
import './NewPlaylistPage.css'; // 

export default function NewPlaylistPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPlaylist({ name, description });
      navigate('/playlists'); // Redirect to playlist index page 
    } catch (err) {
      console.error(err);
      alert('Failed to create playlist');
    }
  }

  return (
    <div className="new-playlist-page">
      <h1>Create a New Playlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Playlist Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}
