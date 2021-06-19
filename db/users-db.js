const UsersModel = require("./clients/mongo");

async function getUser(email, password) {
    const user = await UsersModel.findOne({email: email, password: password});
    return user;
}

async function register(email, password, fullName) {
    let user = {email, password, fullName}
    await (new UsersModel(user).save());
    return user;
}

module.exports = {register, getUser};
