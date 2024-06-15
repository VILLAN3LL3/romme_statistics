const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5173',
}

app.use(cors(corsOptions));

// GET endpoint
app.get('/games', (req, res) => {
    fs.readFile('data/game.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading game data');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

// POST endpoint
app.post('/games', (req, res) => {
    fs.readFile('data/game.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading game data');
        } else {
            const games = JSON.parse(data);
            games.push(req.body);
            fs.writeFile('data/game.json', JSON.stringify(games, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing game data');
                } else {
                    res.status(201).send('Game added');
                }
            });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));