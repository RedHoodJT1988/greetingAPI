const http = require("http");
const url = require("url");

// Create server, parse the URL and trim the path
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const chosenHandler =
    router[trimmedPath] !== undefined ? router[trimmedPath] : handler.notFound;

  // Set payload, payloadString, as well as configure header
  chosenHandler(statusCode => {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    const payload = statusCode === 200 ? { response: "Howdy Y'all!!" } : {};
    const payloadString = JSON.stringify(payload);
    res.end(payloadString);
    console.log("Returned the following: ", statusCode, payload);
  });
});

// Instantiate server port, listening on port 3000
server.listen(3000, () => {
  console.log("Web Server listening on port 3000...");
});

// Handler set to empty object
const handler = {};

// Handler - GET request
handler.hello = callback => {
  return callback(200);
};

// Handler - Error 404 not found
handler.notFound = callback => {
  return callback(404);
};

// Router
const router = {
  hello: handler.hello
};
