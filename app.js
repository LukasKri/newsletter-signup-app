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

    // Enter data from your MailChimp account
    const url =
        "https://usX.api.mailchimp.com/3.0/lists/" + YOUR_MAILCHIMP_LIST_ID;

    // // Options by API
    const options = {
        method: "POST",
        auth: "user1:" + YOUR_MAILCHIMP_API_KEY,
    };

    // // Pass options to a request
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
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
