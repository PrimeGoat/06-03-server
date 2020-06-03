const http = require('http');
const fs = require('fs');

const obj = {
    name: "Flo",
    job: "firefighter",
    age: 200
};

const server = http.createServer((req, res) => {
    console.log("Incoming request: " + req.url);
    let readStream;
    switch(req.url) {
        case "/index":
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/html' });
            readStream = fs.createReadStream('./index.html', 'utf8');
            readStream.pipe(res);
            break;
        case "/about":
            res.writeHead(200, { 'Content-Type': 'text/html' });
            readStream = fs.createReadStream('./about.html', 'utf8');
            readStream.pipe(res);
            break;
        case "/users":
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(obj));
            break;
        default:
            console.log("404 error: " + req.url);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("No route");
            break;
    }
});

server.listen(3000, (msg) => {
    console.log("Listening to port 3000");
});
