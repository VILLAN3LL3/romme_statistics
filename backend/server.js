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

app.get('/games/:filename', (req, res) => {
    const { filename } = req.params;
    const filepath = path.join('data', `${filename}.json`);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('No JSON file found with the provided filename');
        }

        fs.readFile(filepath, (err, data) => {
            if (err) {
                return res.status(500).send('Error reading game data');
            }

            const players = filename.split('_');
            if (players.length < 2) {
                return res.status(422).send("The number of players falls below the minimum value of 2");
            }
            if (players.length > 2) {
                return res.status(422).send("The number of players exceeds the permitted value of 2");
            }

            const games = JSON.parse(data);
            res.send({ games, players });
        });
    });
});

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

app.get('/games', (req, res) => {
    const directoryPath = path.join(__dirname, 'data');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        const jsonFiles = files
            .filter(file => path.extname(file) === '.json')
            .map(file => path.basename(file, '.json'));
        res.send(jsonFiles);
    });
});

app.post('/games', (req, res) => {
    const { players } = req.body;

    if (!Array.isArray(players) || players.length !== 2) {
        return res.status(422).send('Invalid players array. It should contain exactly two players.');
    }

    const filename = players.join('_');
    const filepath = path.join(__dirname, 'data', `${filename}.json`);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (!err) {
            return res.status(422).send('A file with the same name already exists.');
        }

        fs.writeFile(filepath, JSON.stringify([], null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing game data.');
            }

            res.status(201).send('Game file created.');
        });
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));