const express = require("express")
const playerController = require('./controller/playerController');
const questionController = require('./controller/questionsController');
const bodyparser = require('body-parser');
const session = require('express-session')


const app = express();

app.use(bodyparser.json());
app.use(express.json());

app.use(session({
    secret: "2l seeki meeki",
    saveUninitialized : true,
    resave: true,
    cookie: { 
        maxAge: 10 * 60 * 1000,  
        secure: false    
    }
}))

function isLoggedin(req,res,next){

    if(!req.session.player_name) res.status(401).send({message: "You need to login first to view this resource!"});
    else next();

}


app.get('/players',  playerController.getAllPlayers)
app.get('/player',  playerController.getPlayer)
app.post('/login',playerController.login)
app.get('/logout', playerController.logout)
app.post('/createNewPlayer', playerController.createNewPlayer)
app.delete('/player/:player_name', isLoggedin, playerController.deleteExistingPlayer)
app.patch('/player/:player_name',isLoggedin, playerController.updatePlayerData)

app.get('/questions',isLoggedin, questionController.getQuestions)
app.post('/createNewQuestion', isLoggedin, questionController.createNewQuestion)
app.post('/solveQuestion', isLoggedin, )
app.delete('/deleteQuestion', isLoggedin, questionController.deleteExistingQuestion)


app.listen(80);