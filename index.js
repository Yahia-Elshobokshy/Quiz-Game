const express = require("express")
const playerController = require('./controller/playerController');
const questionController = require('./controller/questionsController');
const bodyparser = require('body-parser');


const app = express();

app.use(bodyparser.json());
app.use(express.json());


app.get('/players',  playerController.getAllPlayers)
app.get('/player',  playerController.getPlayer)
app.post('/createNewPlayer', playerController.createNewPlayer)
app.delete('/player/:player_name', playerController.deleteExistingPlayer)
app.patch('/player/:player_name', playerController.updatePlayerData);

app.get('/questions', questionController.getQuestions);
app.post('/createNewQuestion', questionController.createNewQuestion);
app.delete('/deleteQuestion', questionController.deleteExistingQuestion);


app.listen(80);