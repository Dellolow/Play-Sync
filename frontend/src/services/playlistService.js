import sendRequest from './sendRequest';
const BASE_URL = '/api/playlists';

export function createPlaylist(playlistData) {
  return sendRequest(BASE_URL, 'POST', playlistData);
}

export function getAll() {
  return sendRequest(BASE_URL);
}


export function getOne(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
