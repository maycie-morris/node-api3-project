const express = require('express');
const User = require('./userDb')
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  const data = req.body

  User.insert(data)
    .then(users => {
      if(users) {
        res.status(201).json(users)
      } else {
        res.status(400).json({
          errorMessage: "Please provide a name for the user"
        })
      }
    })
    .catch (err => {
      console.log(err)
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      })
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const { name } = req.body

  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: 'Please provide a name for the post'
    })
  }

  User.insert({ name })
    .then(users => {
      if (!users.id) {
        res.status(404).json({
          message: 'The user with the specific ID does not exist.'
        })
      } else {
        res.status(201).json(users)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'There was an error while saving the user to the database.'
      })
    })
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
