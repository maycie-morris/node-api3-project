const express = require('express');
const User = require('./userDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
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
  User.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'The user information cannot be retrieved.'
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.getById(req.params.id)
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'The user information could not be retrieved.'
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then(users => {
      if (users) {
        res.status(200).json({
          message: 'The user has been deleted.'
        })
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'The post could not be removed.'
      })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: 'Please provide a user name.'
    })
  }

  User.update(req.params.id, req.body)
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'The user information could not be modified.'
      })
    })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.params.id)
    .then(id => {
      if (id) {
        return next()
      } else {
        return res.status(404).json({
          message: 'User not found.'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        message: 'Invalid user ID'
      })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body){
    return res.status(400).json({message: 'Missing user data.'})
  } else if (!req.body.name) {
    return res.status(400).json({message: 'Missing required name field.'});
  }

  next();
}


function validatePost(req, res, next) {
  // do your magic!
  if(req.body.name) {
    next();
  } else if (!req.body) {
    res.status(400).json({
      message: 'Missing user data.'
    })
  } else {
    res.status(400).json({
      message: 'Missing required name field.'
    })
  }
}

module.exports = router;
