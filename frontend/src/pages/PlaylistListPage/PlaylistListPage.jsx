import { useState, useEffect } from 'react';
import * as playlistService from '../../services/playlistService'; // Updated to point to your playlist API utility
import './PlaylistListPage.css';
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'; // Update to your playlist item component

export default function PlaylistListPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      const fetchedPlaylists = await playlistService.getAll(); // Fetch playlists from the service
      setPlaylists(fetchedPlaylists);
    }
    fetchPlaylists();
  }, []);

  const playlistItems = playlists.map((playlist) => (
    <PlaylistItem key={playlist._id} playlist={playlist} />
  ));

  return (
    <>
      <h1>My Playlists</h1>
      <section className="playlist-item-container">{playlistItems}</section>
    </>
  );
}
