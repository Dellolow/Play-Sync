const express = require('express');
const router = express.Router();
const playlistsCtrl = require('../controllers/playlists');

router.get('/', playlistsCtrl.index);
router.get('/:id', playlistsCtrl.show);
router.post('/', playlistsCtrl.create);
router.post('/:id/songs', playlistsCtrl.addSong);

module.exports = router;
