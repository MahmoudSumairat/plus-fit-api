const { initializeApp } = require("firebase/app");
const { getStorage, ref } = require("firebase/storage");
const firebaseConfig = require("../../config/firebase");

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

module.exports = storage;
