const { uploadBytes, ref, getDownloadURL } = require("firebase/storage");
const storage = require("../db/connection/storageConnect");

const productService = {
  uploadProductImages: async (files) => {
    const fileDownloadURLs = [];
    console.log("Uploading Files to Firebase ...");
    for (let file of files) {
      const reference = ref(storage, file.name);
      const snapshot = await uploadBytes(reference, file.data);
      const url = await getDownloadURL(snapshot.ref);
      fileDownloadURLs.push(url);
    }
    console.log("Uploaded files successfully!");
    return Promise.resolve(fileDownloadURLs);
  },
};

module.exports = productService;
