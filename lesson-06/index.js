import http from "http";
import customers from "./customer.js";
import appointment from "./appointment.js";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/customers") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(customers));

    return;
  }

  if (req.method === "GET" && req.url === "/appointments") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(appointment));

    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: "Route not found",
    }),
  );
});

server.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
