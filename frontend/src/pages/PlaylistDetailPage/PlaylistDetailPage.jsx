import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as playlistService from '../../services/playlistService'; // Updated to point to your playlist API utility
import * as songService from '../../services/songService';
import './PlaylistDetailPage.css';

export default function PlaylistDetailPage() {
  const [playlist, setPlaylist] = useState(null);
  const [availSongs, setAvailSongs] = useState([]);
  const {id} = useParams()


  useEffect(() => {
    async function fetchPlaylist() {
      const fetchedPlaylist = await playlistService.getOne(id); // Fetch playlists from the service
      setPlaylist(fetchedPlaylist);
    }
    fetchPlaylist();

    async function fetchAvailSongs() {
      const fetchedAvailSongs = await songService.getAvailSongs(playlistId); 
      setAvailSongs(fetchedAvailSongs);
    }
    fetchAvailSongs();
  }, [id]);

  if (!playlist) return null;


  return (
    <>
      <h1>Playlist Details</h1>
      <section className="PlaylistDetailPage">

        <article>
          <h2> {playlist.name} </h2>
          <p>{playlist.description}</p>
          <hr/>
          <h4>Songs</h4>
          {playlist.songs.length ? <p>Songs Exist</p> : <p>No songs yet!</p>}
        </article>
        <article> 
          <h2>Available Songs</h2>
        </article>
      </section>
    </>
  );
}
