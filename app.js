const express = require("express");
const https = require("https");

const app = express();

//Used to parse JSON bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded());

app.listen(3000, () => {
    console.log("The server is running on port 3000.");
});
