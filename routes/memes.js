require('dotenv').config();
var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function(req, res, next) {
  // Attach the user object to the req object
  req.user = req.session.passport ? req.session.passport.user : null;

  axios.get(process.env.API_URL)
    .then(response => {
      let memes = response.data.data.memes;
      res.render('memes', { user: req.user, data: memes });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching memes');
    });
});

router.post('/', (req, res, next) =>{
  memeDetails = req.body;
  res.status(200).json(memeDetails)
})

module.exports = router;


// let memesCache = null;

// router.get('/', function(req, res, next) {
//   // Attach the user object to the req object
//   req.user = req.session.passport ? req.session.passport.user : null;

//   if (memesCache) {
//     res.render('memes', { user: req.user, data: memesCache });
//   } else {
//     axios.get(process.env.API_URL)
//       .then(response => {
//         memesCache = response.data.data.memes;
//         res.render('memes', { user: req.user, data: memesCache });
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).send('Error fetching memes');
//       });
//   }
// });


// router.post('/', (req, res, next) =>{
//   memeDetails = req.body;
//   res.status(200).json(memeDetails)
// })

// module.exports = router;