var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/:id', function (req, res, next) {
  if (!req.user) {
    res.redirect('/login');  // Redirect to the login page if the user is not logged in
  } else {
    axios.get(process.env.API_URL)
      .then(response => {
        let memes = response.data.data.memes;
        let memeDetails = memes.find(meme => meme.id === req.params.id);
        if (memeDetails) {
          res.render('meme', { user: req.user, data: memeDetails });
        } else {
          res.status(404).send('Meme not found');
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching meme details');
      });
  }
});

module.exports = router;
