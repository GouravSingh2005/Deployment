import express from "express";
import {prismaclient} from "db/client"; // correct import

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  prismaclient.user.findMany()
    .then((users: any) => {
      res.json(users);
    })
    .catch((err: { message: any; }) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/user", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and Password are required" });
    return;
  }

  prismaclient.user.create({
    data: {
      username,
      password
    }
  })
  .then((user: any) => {
    res.status(201).json(user);
  })
  .catch((error: { message: any; }) => {
    res.status(500).json({ error: error.message });
  });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
