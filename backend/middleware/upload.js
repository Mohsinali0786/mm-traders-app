const multer = require("multer");

const upload = multer({

    storage: multer.diskStorage({}),
    limits: { fileSize: 10000000 }, // 10 MB
})

// const storage = multer.memoryStorage();

// module.exports = multer({ storage });
module.exports = upload;