const express = require("express")
const playerController = require('./controller/playerController');

const app = express();

app.use(express.json());


app.get('/players',  playerController.getAllPlayers)
app.post('/createNewPlayer', playerController.createNewPlayer)
app.delete('/player/:player_name', playerController.deleteExistingPlayer)
app.patch('/player/:player_name', playerController.updatePlayerData);

app.listen(80);