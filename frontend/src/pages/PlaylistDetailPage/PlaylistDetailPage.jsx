import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router';
import * as playlistService from '../../services/playlistService'; // Updated to point to your playlist API utility
import * as songService from '../../services/songService';
import './PlaylistDetailPage.css';
import SongItem from '../../components/SongItem/SongItem';

export default function PlaylistDetailPage() {
  const [playlist, setPlaylist] = useState(null);
  const [availSongs, setAvailSongs] = useState([]);
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    genre: 'Hip-Hop',
    duration: '',
  });
  
  const {id} = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchPlaylist() {
      const fetchedPlaylist = await playlistService.getOne(id); // Fetch playlists from the service
      setPlaylist(fetchedPlaylist);
    }
    fetchPlaylist();

    async function fetchAvailSongs() {
      const fetchedAvailSongs = await songService.getAvailSongs(id); 
      setAvailSongs(fetchedAvailSongs);
    }
    fetchAvailSongs();
  }, [id]);

  if (!playlist) return null;

  async function handleCreateSong(evt) {
    evt.preventDefault();
    try {
      const newSong = await songService.create(songData);
      setAvailSongs([...availSongs, newSong]);
      setSongData({
        title: '',
        artist: '',
        genre: 'Hip-Hop',
        duration: '',
      });
    } catch (err) {
      console.log(err)
    }
  }
  async function handleChange(evt) {
    setSongData({...songData, [evt.target.name]: evt.target.value});
  }

  async function handleAddToPlaylist(songId) {
    const updatedPlaylist = await playlistService.addToPlaylist(playlist._id, songId); 
    setAvailSongs(availSongs.filter((song) => song._id !== songId) ); 
    setPlaylist(updatedPlaylist); 
  }

  async function handleRemoveFromPlaylist(songId) {
    const [updatedPlaylist, updatedAvailSongs] = await playlistService.removeFromPlaylist(playlist._id, songId); 
    setAvailSongs(updatedAvailSongs); 
    setPlaylist(updatedPlaylist); 
  }

  async function handleDeleteButton() {
    await playlistService.deletePlaylist(id);
    navigate('/playlists'); 
  }

  const availSongItems = availSongs.map((song) => <SongItem handleAddToPlaylist={handleAddToPlaylist} song={song} key={song._id}/>);
  const playlistSongItems = playlist.songs.map((song) => <SongItem handleRemoveFromPlaylist={handleRemoveFromPlaylist} song={song} key={song._id}/>);

  return (
    <>
      <h1>Playlist Details</h1>
      <section className="PlaylistDetailPage">

        <article>
          <h2> {playlist.name} </h2>
          <p>{playlist.description}</p>
          <button onClick={handleDeleteButton}>Delete Playlist</button>
          <hr/>
          <h4>Songs</h4>
          {playlist.songs.length ? <section>{availSongItems}</section> : <p>No Songs Yet!</p>}
        </article>
        <article> 
          <h2>Available Songs</h2>
          {availSongs.length ? <section>{availSongItems}</section> : <p>No songs available!</p>}
          <form onSubmit={handleCreateSong}>
            <label>Title</label> 
            <input name="title" value={songData.title} onChange={handleChange} type="text" />
            <label>Artist</label> 
            <input name="artist" value={songData.artist} onChange={handleChange} type="text" />
            <label>Genre</label> 
            <select name="genre" value={songData.genre} onChange={handleChange} >
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Pop">Pop</option>
              <option value="R&B">R&B</option>
              <option value="Alternative">Alternative</option>
              <option value="Rock">Rock</option>
              <option value="Funk">Funk</option>
            </select>
            <label>Duration</label> 
            <input name="duration" value={songData.duration} onChange={handleChange} type="text" />
            <button type="submit">Add Song</button>
          </form>
          
        </article>
      </section>
    </>
  );
}
