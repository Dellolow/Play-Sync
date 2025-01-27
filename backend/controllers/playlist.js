const Playlist = require('../models/playlist');
const Song = require('../models/song');

module.exports = {
  create,
  index,
  addSong,
};

async function index(req, res) {
  const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
  res.json(playlists);
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const playlist = await Playlist.create(req.body);
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create playlist' });
  }
}

async function addSong(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) throw new Error('Playlist not found');
    const song = await Song.create(req.body);
    playlist.songs.push(song._id);
    await playlist.save();
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add song' });
  }
}
