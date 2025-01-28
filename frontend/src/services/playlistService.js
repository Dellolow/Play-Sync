import sendRequest from './sendRequest';
const BASE_URL = '/api/playlists';

export function createPlaylist(playlistData) {
  return sendRequest(BASE_URL, 'POST', playlistData);
}
