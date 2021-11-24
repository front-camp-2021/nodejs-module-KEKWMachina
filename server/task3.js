const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

const port = 3001;
server.use(cors());
server.use(bodyParser.json());

server.use("/login", (request, response) => {
  if (request.method === "POST") {
    try {
      const data = fs.readFileSync("user.json", "utf8");
      function validateUser() {
        const email = JSON.parse(data).users.find((user) => {
          return user.email === request.body.email;
        });
        if (!email) {
          response.send({ response: "wrong email" });
        } else if (email.password !== request.body.password) {
          response.send({ response: "wrong password" });
        } else {
          response.send({ response: "logged in" });
        }
      }
      validateUser();
      response.end();
    } catch (err) {
      response.send(err);
    }
  }
});

server.get("/products", (request, response) => {
  try {
    const data = fs.readFileSync("db.json", "utf8");
    response.send(JSON.parse(data).products);
  } catch (err) {
    response.send(err);
  }
});

server.patch("/products", (request, response) => {
  try {
    const db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    db.products = db.products.map((card) => {
      if (card.id === request.body.id) {
        card.images = request.body.images;
        card.title = request.body.title;
        card.rating = request.body.rating;
        card.price = request.body.price;
        card.category = request.body.category;
        card.brand = request.body.brand;
        card.discount = request.body.discount;
        return card;
      } else {
        return card;
      }
    });
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
    response.send({ response: `${request.body.title} was modified` });
  } catch (err) {
    response.send(err);
  }
});

server.put("/products", (request, response) => {
  try {
    const db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    db.products.push(request.body);
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
    response.send({ response: `${request.body.title} was added` });
  } catch (err) {
    response.send("err");
  }
});

server.delete("/products", (request, response) => {
  try {
    const db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    db.products = db.products.filter((item) => {
      return item.title !== request.body.title;
    });
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
    response.send({ response: `${request.body.title} was deleted` })
  } catch (err) {
    response.send(err);
  }
});

server.get("/categories", (request, response) => {
  try {
    const data = fs.readFileSync("db.json", "utf8");
    response.send(JSON.parse(data).categories);
  } catch (err) {
    response.send(err);
  }
});

server.get("/brands", (request, response) => {
  try {
    const data = fs.readFileSync("db.json", "utf8");
    response.send(JSON.parse(data).brands);
  } catch (err) {
    response.send(err);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
