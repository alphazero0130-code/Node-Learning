import http from "http";
import customers from "./customer.js";
import appointment from "./appointment.js";

const server = http.createServer((req, res) => {

  //get request to fetch all customers
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

  ///post request to create a new customer
  if (req.method === "POST" && req.url === "/customers") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      console.log(data);

      res.writeHead(201, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Customer created successfully",
          customer: data,
        })
      )
    });

    return;
  }
});

 
server.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
