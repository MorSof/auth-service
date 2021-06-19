const UsersModel = require("./clients/mongo");

// async function getBlockById(blockId) {
//     const block = await BlockchainModel.findOne({"peerId": "Peer A"},
//         {"chain": {$elemMatch: {"blockId": blockId}}},);
//     if (!block) {
//         throw new Error("Block doesn't exists");
//     }
//     return block.chain[0];
// }
//
// async function getBlockchainById(peerId) {
//     console.log("peer id is " + peerId);
//     const blockchain = await BlockchainModel.findOne({peerId: peerId});
//     if (!blockchain) {
//         throw new Error("Blockchain doesn't exists");
//     }
//     return blockchain;
// }
//
// async function getAllBlockchains() {
//     const blockchains = await BlockchainModel.find();
//     if (!blockchains) {
//         throw new Error("There is no blockchains in DB");
//     }
//     return blockchains;
// }
//
async function register(email, password, fullName) {
    let user = {email, password, fullName}
    await (new UsersModel(user).save());
    return user;
}
//
// async function createBlockchain(peerId, miner, chain, pendingTransactions, difficulty, miningReward) {
//     let blockchain = new Blockchain(peerId, miner, chain, pendingTransactions, difficulty, miningReward);
//     await (new BlockchainModel(blockchain).save());
//     return blockchain;
// }
//
// async function createKeys(privateKey, publicKey) {
//     let keys = new Keys(privateKey, publicKey);
//     await new KeysModel(keys).save();
//     return keys;
// }
//
// async function createMerkelTree(merkelTree) {
//     await new MerkelTreeModel(merkelTree).save();
// }
//
// async function setMerkelTree(merkelTree) {
//     console.log("Set MerkelTree from DB");
//     let newMerkelTree = await getMerkelTree();
//     newMerkelTree.root = merkelTree.root;
//     await new MerkelTreeModel(newMerkelTree).save();
//     if (!newMerkelTree) {
//         throw new Error("newMerkelTree don't exist");
//     }
//     return newMerkelTree;
// }
//
// async function getMerkelTree() {
//     const merkelTree = await MerkelTreeModel.findOne();
//     if (!merkelTree) {
//         throw new Error("MerkelTree doesn't exist");
//     }
//     return merkelTree;
//
// }
//
//
// async function getKeys() {
//     console.log("Get keys from DB");
//     const keys = await KeysModel.findOne();
//     if (!keys) {
//         throw new Error("Keys don't exist");
//     }
//     return keys;
// }
//
// async function setKeys(privateKey, publicKey) {
//     console.log("Set keys from DB");
//     let newKeys = await getKeys();
//     newKeys.publicKey = publicKey;
//     newKeys.privateKey = privateKey;
//     await new KeysModel(newKeys).save();
//     if (!newKeys) {
//         throw new Error("Keys don't exist");
//     }
//     return newKeys;
// }
//
//
module.exports = {register};
