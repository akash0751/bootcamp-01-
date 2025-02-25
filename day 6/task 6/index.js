const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json()); 

const users = [{
    id:1,name:"Arjun"
},{
    id:2,name:"Arnav"
}]

app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Name is required and must be a string." });
  }

  if (name.length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters long." });
  }

  const user = users;

  if (user.some((user1) => user1.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: "User with this name already exists." });
  }

  const newUser = {
    id: user.length ? user[user.length - 1].id + 1 : 1,
    name,
  };

  user.push(newUser);
  res.status(201).json({ message: "User added", user: newUser });
});

app.get('/users',(req,res)=>{
    res.json(users);
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
