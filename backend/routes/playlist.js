const express = require('express');
const router = express.Router();
const playlistsCtrl = require('../controllers/playlist');

router.get('/', playlistsCtrl.index);
router.post('/', playlistsCtrl.create);
router.post('/:id/songs', playlistsCtrl.addSong);

module.exports = router;
