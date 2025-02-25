const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


let users = [{id:1,name:"John"},
    {id:2,name:"Kevin"}
];


app.post('/users', (req, res) => {
    const {id,name} = req.body;
    
    if (!id ||!name ) {
        return res.status(400).json({ message: "Name and age are required" });
    }

    users.push({id,name});

    res.json({ message: "User added" });
});


app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
