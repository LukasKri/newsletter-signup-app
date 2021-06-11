const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

//Used to parse JSON bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

// Signup Route
app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;

    // Construct req data by API
    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    // // Turn data to a string
    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/e1ecaaf3b0";

    // // Options by API
    const options = {
        method: "POST",
        auth: "lukas1:81f0c733d589fe6e544cd2a3ad25163c-us7",
    };

    // // Pass options to a request
    const request = https.request(url, options, (response) => {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

// Failure Route
app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("The server is running on port 3000.");
});
