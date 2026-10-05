console.log('backend server starting...');
// npm init -y - create package.json

const http = require("http");

const customers = [
  {
    id: 1,
    name: "Rahul",
    phone: "9876543210"
  },
  {
    id: 2,
    name: "Priya",
    phone: "9876543211"
  }
];

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            message: "Hello from backend",
            customers
        })
    );
});

server.listen(3000, () => {
     console.log("Server running on http://localhost:3000");
})
