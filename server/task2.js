const express = require("express");
const path = require("path");
const fs = require("fs");

const server = express();

const port = 5000;

server.get("/", (request, response) => {
    response.send("Working");
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

fs.writeFileSync("message.txt", "1\n2\n3\n4\n5\n6\n7\n8\n10\n", function(err) {
    if (err) throw err;
});

fs.readFile("message.txt", 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
});

fs.unlinkSync("message.txt", function(err) {
    if (err) throw err;
})