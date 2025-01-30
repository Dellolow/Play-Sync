const Song = require('../models/song');
const Playlist = require('../models/playlist');

module.exports = {
  create,
  getAvail,
  search,
};

async function getAvail(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    const songs = await Song.find({user: req.user._id, _id: {$nin: playlist.songs}});
    res.json(songs);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch Available Songs' });
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const song = await Song.create(req.body);
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create song' });
  }
}

async function search(req, res) {
  try {
    const query = req.query.q || ''; // Search query from the client
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(songs);
  } catch (err) {
    res.status(400).json({ message: 'Failed to search for songs' });
  }
}
