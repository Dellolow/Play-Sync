import "./SongItem.css"

export default function SongItem({ song, handleAddToPlaylist, handleRemoveFromPlaylist }) {
  return (
    <article className="SongItem">
      <h4>🕺{song.title}</h4>
      <div>Genre: {song.genre}</div>

      <button onClick={() => handleAddToPlaylist(song._id)}>Add to Playlist</button>
    </article>
  );
}
