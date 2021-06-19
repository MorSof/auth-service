const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(config.get('mongo.host'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to MongoDB...")
    })
    .catch((err) => console.error('Could not connect to MongoDB', err)
    );

const UsersModel = mongoose.model('User',
    new mongoose.Schema({
        email: String,
        password: String,
        fullName: String
    })
);

module.exports = UsersModel;
