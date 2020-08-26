const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());

const users = [];
const DUMMY_TOKEN = "DUMMY_TOKEN";

app.post("/register", async (req, res) => {
  try {
    const hashedPassoword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassoword);
    const user = { name: req.body.name, password: hashedPassoword };
    users.push(user);
    res.cookie("token", DUMMY_TOKEN, {
      expires: new Date(Date.now() + 604800000),
      secure: false, // set to true if your using https
      httpOnly: true,
    });
    res.status(201).send(users);
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((use) => use.name === req.body.name);
  if (user == null) {
    return res.status(400).send("not found");
  }
  try {
    const token = req.cookies.token;
    if (
      (await bcrypt.compare(req.body.password, user.password)) &&
      token === DUMMY_TOKEN
    ) {
      res.send("success");
    } else {
      res.send("You're a fraud");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);
