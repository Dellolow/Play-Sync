const express = require('express');
const router = express.Router();
const playlistsCtrl = require('../controllers/playlists');

router.get('/', playlistsCtrl.index);
router.get('/:id', playlistsCtrl.show);
router.post('/', playlistsCtrl.create);
router.put('/:playlistId/add-song/:songId', playlistsCtrl.addSong)
router.put('/remove-song/:songId', playlistsCtrl.removeSong)
router.delete('/:playlistId', playlistsCtrl.delete)

module.exports = router;
