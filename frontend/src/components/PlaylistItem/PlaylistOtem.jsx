import { Link } from "react-router";

export default function PlaylistItem({ playlist }) {
  return (
    <article>
      <h4>🕺{playlist.name}</h4>
      <Link to={`/playlist/${playlist._id}`}> Details </Link>
    </article>
  );
}
