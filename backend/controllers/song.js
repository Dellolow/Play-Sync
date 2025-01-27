const Song = require('../models/song');

module.exports = {
  create,
  index,
  search,
};

async function index(req, res) {
  try {
    const songs = await Song.find({}).populate('playlist');
    res.json(songs);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch songs' });
  }
}

async function create(req, res) {
  try {
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
