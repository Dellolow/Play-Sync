const express = require('express');
const router = express.Router();
const songsCtrl = require('../controllers/songs');

router.get('/avail/:playlistId', songsCtrl.getAvail);
router.post('/', songsCtrl.create);

module.exports = router;
