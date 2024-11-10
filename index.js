const express = require('express');
const app = express();
const cors = require ('cors')
const port = 5000;
app.use(cors())

const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

app.get('/api/start-game', (req, res) => {
    
    const cardDeck = [...num, ...num].sort(() => 0.5 - Math.random());
    res.json({ board: cardDeck });
});

app.listen(port, () => {
    console.log(`Memory game backend running at http://localhost:${port}`);
});