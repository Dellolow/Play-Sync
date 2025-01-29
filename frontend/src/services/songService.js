import sendRequest from './sendRequest';
const BASE_URL = '/api/songs';

export function createPlaylist(playlistData) {
  return sendRequest(BASE_URL, 'POST', playlistData);
}


export function getAvailSongs(playlistId) {
  return sendRequest(`${BASE_URL}/avail/${playlistId}`);
}
