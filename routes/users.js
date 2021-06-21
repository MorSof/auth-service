import {encodeToken, jwtVerification} from "../services/jwt-authentication";

const express = require('express');
const router = express.Router();
const usersService = require('../services/users-service');
const {jwtLogin} = require("../services/jwt-authentication");

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
    res.status(400).json({status: 400, message: err.message})
  }
})

router.post('/jwt-login', async function login (req, res) {
  try {
    const {email, password} = req.body;
    const accessToken = await usersService.login(email, password);
    return res.json({accessToken});
  }catch (err) {
    console.error(err);
    res.status(401).json({status: 401, message: err.message});
  }
});

router.get('/verify-token', async function verifyToken (req, res) {
  try {
    const accessToken = req.header('Access-Token');
    await usersService.verifyToken(accessToken);
    return res.json({isVerified: true});
  }catch (err) {
    console.error(err);
    res.json({isVerified: false, message: err.message});
  }
});

module.exports = router;
