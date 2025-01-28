// src/utilities/playlists-api.js
import sendRequest from './send-request';

const BASE_URL = '/api/playlists';

export function createPlaylist(playlistData) {
  return sendRequest(BASE_URL, 'POST', playlistData);
}
