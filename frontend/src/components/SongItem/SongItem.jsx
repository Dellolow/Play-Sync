import "./SongItem.css"

export default function SongItem({ song }) {
  return (
    <article className="SongItem">
      <h4>🕺{song.title}</h4>
      <p>Genre: {song.genre}</p>
    </article>
  );
}
