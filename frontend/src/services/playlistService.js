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
export function deletePlaylist(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function addToPlaylist(playlistId, songId) {
  return sendRequest(`${BASE_URL}/${playlistId}/add-song/${songId}`, 'PUT');
} 

export function removeFromPlaylist(songId) {
  return sendRequest(`${BASE_URL}/remove-song/${songId}`, 'PUT');
} 