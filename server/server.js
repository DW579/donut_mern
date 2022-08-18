const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const ImageKit = require("imagekit");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Increase size of data being passed between client to server for large base64 files (these two lines of code throw the body-parser deprecated, need to research but works)
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());
app.use(express.json());

// Mongodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

// Routes
const campaignsRouter = require("./routes/campaigns");

app.use("/campaigns", campaignsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});