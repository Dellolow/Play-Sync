// src/utilities/playlists-api.js
import sendRequest from '../utilities/send-request';
import { createPlaylist } from '../../services/playlistService';

const BASE_URL = '/api/playlists';

export function createPlaylist(playlistData) {
  return sendRequest(BASE_URL, 'POST', playlistData);
}
