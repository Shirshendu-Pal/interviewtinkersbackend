const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require('./configuration/config');
const port = config.serverPort || 8080;
const router = require("./routes");

const runServer = () => { 

    mongoose.connect(config.mongoose.url, config.mongoose.options);

    app.use(cors());
    
    app.use(express.json());

    app.use("/api", router);

    app.listen(port, () => {
        console.log(`server listening over http on port ${port}`);
    });

    app.use((err, req, res, next) => {
        const { statusCode = 400, message = 'Something went wrong!' } = err;
        res.status(statusCode).json({ message, success: false });
    });

}

module.exports = { runServer };