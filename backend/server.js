const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5173',
}

app.use(cors(corsOptions));

// GET endpoint
app.get('/games', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            res.status(500).send('Error reading data directory');
        } else {
            const jsonFile = files.find(file => path.extname(file) === '.json');
            if (jsonFile) {
                fs.readFile(`data/${jsonFile}`, (err, data) => {
                    if (err) {
                        res.status(500).send('Error reading game data');
                    } else {
                        const players = path.basename(jsonFile, '.json').split('_');
                        if (players.lenght < 2) {
                            res.status(422).send("The number of players falls below the minimum value of 2");
                        }
                        if (players.length > 2) {
                            res.status(422).send("The number of players exceeds the permitted value of 2");
                        }
                        const games = JSON.parse(data);
                        res.send({ games, players });
                    }
                });
            } else {
                res.status(404).send('No JSON file found in data directory');
            }
        }
    });
});

// POST endpoint
app.post('/games/:filename', (req, res) => {
    const { filename } = req.params;
    fs.readFile(`data/${filename}.json`, (err, data) => {
        if (err) {
            res.status(500).send('Error reading game data');
        } else {
            const games = JSON.parse(data);
            games.push(req.body);
            fs.writeFile(`data/${filename}.json`, JSON.stringify(games, null, 2), (err) => {
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
app.listen(port, () => console.log(`Server running on port ${port}`))
