const Playlist = require('../models/playlist');
const Song = require('../models/song');

module.exports = {
  create,
  index, 
  addSong,
  removeSong,
  show,
  delete: deletePlaylist
};

async function index(req, res) {
  try {
    // Fetch all playlists for the logged-in user
    const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch playlists' });
  }
}

async function show(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch playlist' });
  }
}

async function deletePlaylist(req, res) {
  try {
    await Playlist.findByIdAndDelete(req.params.playlistId);
    res.json({ message: 'Playlist Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch playlist' });
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id; // Assign the logged-in user as the playlist owner
    const playlist = await Playlist.create(req.body);
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create playlist' });
  }
}

async function addSong(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) throw new Error('Playlist not found');
    playlist.songs.push(req.params.songId); // Add song to playlist
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add song' });
  }
}

async function removeSong(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) throw new Error('Playlist not found');

    playlist.songs = playlist.songs.filter(
      (songId) => songId.toString() !== req.params.songId
    ); // Remove song from playlist
    await playlist.save();
    res.json({ message: 'Song removed successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to remove song' });
  }
}
