const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token = ""

let nextId = 7;

let traveling = [
    {
        id: 1,
        name: 'Brazil',
        hotels: 24,
        trails: 'Brazil Trail' 
    },
    {
        id: 2,
        name: 'Ireland',
        hotels: 15,
        trails: 'Ireland Trail' 
    },
    {
        id: 3,
        name: 'Columbia',
        hotels: 30,
        trails: 'Columbia Trail' 
    },
    {
        id: 4,
        name: 'Alaska',
        hotels: 10,
        trails: 'Alaska Trail' 
    },
    {
        id: 5,
        name: 'Canada',
        hotels: 29,
        trails: 'Canada Trail' 
    },
    {
        id: 6,
        name: 'Australia',
        hotels: 24,
        trails: 'Main Trail' 
    }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
    const { authorization } = req.headers;
    if (authorization === token) {
        next();
    } else {
        res.status(403).json({ error: 'User must be logged in to do that.' });
    }
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'TestId' && password == 'password123') {
        req.loggedIn = true;
        res.status(200).json({
            payload: token
        });
    } else {
        res
            .status(403)
            .json({ error: 'Username or Password are invalid. Please try again.' });
    }
});

app.get('/api/traveling/:id', authenticator, (req, res) => {
    const traveler = traveling.find(t => t.id == req.params.id);

    if (traveler) {
        res.status(200).json(traveler);
    } else {
        res.status(404).send({ msg: 'Traveler not found' });
    }
});

app.post('/api/traveling', authenticator, (req, res) => {
    const traveler = { id: getNextId(), ...req.body };

    traveling = [...traveling, traveler];

    res.send(traveling);
});

app.put('/api/traveling/:id', authenticator, (req, res) => {
    const { id } = req.params;

    const travelerIndex = traveling.findIndex(t => t.id == id);

    if (travelerIndex > -1) {
        const traveler = { ...traveling[travelerIndex], ...req.body };

        traveling = [
            ...traveling.slice(0, travelerIndex),
            traveler,
            ...traveling.slice(travelerIndex + 1)
        ];
        res.send(traveling);
    } else {
        res.status(404).send({ msg: 'Traveler not found.' });
    }
});

app.delete('/api/traveling/:id', authenticator, (req, res) => {
    const { id } = req.params;

    traveling = traveling.filter(t => t.id !== Number(id));

    res.send(traveling);
});

function getNextId() {
    return nextId++;
}

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

