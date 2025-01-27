const Song = require('../models/song');

module.exports = {
  create,
  index,
};

async function index(req, res) {
  const songs = await Song.find({}).populate('playlist');
  res.json(songs);
}

async function create(req, res) {
  try {
    const song = await Song.create(req.body);
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create song' });
  }
}
