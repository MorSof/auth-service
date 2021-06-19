const express = require('express');
const router = express.Router();
const usersService = require('../services/users-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function register(req, res) {
  try {
    const { email, password, fullName } = req.body;
    const newUser = await usersService.register(email, password, fullName);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.json(err.message);
  }
})

module.exports = router;
