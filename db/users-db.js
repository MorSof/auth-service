const UsersModel = require("./clients/mongo");

async function login(email, password) {
    const user = await UsersModel.findOne({email: email, password: password});
    return user;
}

async function register(email, password, fullName) {
    let user = {email, password, fullName}
    if (await UsersModel.findOne({email: email})){
        throw new Error("Email already exists");
    }
    await (new UsersModel(user).save());
    return user;
}

async function getUserByEmail(email) {
    const user = await UsersModel.findOne({email: email});
    return user;
}

module.exports = {register, login, getUserByEmail};
