export default function PlaylistItem({ playlist }) {
  return (
    <article>
      <h4>{new Date(playlist.createdAt).toLocaleDateString()}</h4>
      <p>{playlist.name}</p>
      <h4>🕺{playlist.description}</h4>
    </article>
  );
}
