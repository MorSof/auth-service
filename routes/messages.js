const express = require('express');
const {isAuthenticatedMiddleware} = require("../services/jwt-authentication");
const router = express.Router();

const messages = [];

router.get('/', isAuthenticatedMiddleware, function getAll(req, res) {
    const userId = getUserIdFromAuthenticatedRequest(req);
    const response = messages.filter(message => message.fromUserId === userId || message.toUserId === userId);
    res.json(response);
})

router.post('/', isAuthenticatedMiddleware, async function post(req, res) {
    const userId = getUserIdFromAuthenticatedRequest(req);
    const { text, toUserId } = req.body;
    const id = messages.length + 1;

    if (!text || !toUserId) {
        res.status(400);
        return res.json({ error: 'Message requires both `text` and `toUserId` fields.' });
    }

    const newMessage = {
        id, text, fromUserId: userId, toUserId
    };

    messages.push(newMessage);
    res.json(newMessage);
})

function getUserIdFromAuthenticatedRequest(req) {
    return '1'; // hardcoding for now, pending authentication implementation
}


module.exports = router;
