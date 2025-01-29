import sendRequest from './sendRequest';
const BASE_URL = '/api/songs';

export function create(songData) {
  return sendRequest(BASE_URL, 'POST', songData);
}


export function getAvailSongs(playlistId) {
  return sendRequest(`${BASE_URL}/avail/${playlistId}`);
}
