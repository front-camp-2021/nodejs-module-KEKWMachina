const http = require("http");

const port = 5000;

const server = http.createServer((request, response) => {
    const url = request.url;

    if (url === "/") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.write("<h1>Greeting from server!</h1>");
        response.end();
    }

    if (url === "/data") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.write("<p>Welcome to data path</p>");
        response.end();
    }
});

server.listen(port, () => {
    console.log(`Runs on port ${port}`);
})