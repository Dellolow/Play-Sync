const path = require('path'); 
const express = require('express');
const logger = require('morgan');
const app = express();


require('dotenv').config();

// Connect to the database
require('./db');

app.use(logger('dev'));
// Serve static assets from the frontend's built code folder (dist)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.use(require('./middleware/checkToken'));

// API Routes
app.use('/api/auth', require('./routes/auth'));

// All routers below will have all routes protected
app.use(require('./middleware/ensureLoggedIn'));

app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/songs', require('./routes/songs'));

// Use a "catch-all" route to deliver the frontend's production index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});

app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/songs', require('./routes/songs'));
