const bcrypt = require('bcrypt')
const players = require('../Models/playerModel');

async function checkifPlayerExists(player_name){
    return new Promise((resolve, reject) => {
        players.getPlayer(player_name, (err, data) => {
            if (err) {
                reject(err); 
            } else if (data) {
                resolve(true); 
            } else {
                resolve(false); 
            }
        });
    });

}

const playerController = {
    login : async (req,res)=>{
        const { player_name } = req.body
        if(! await checkifPlayerExists(player_name)){ 
            res.status(400).send({message: "Username not registered, sign up and try again"});
        }
        else{
            if(!req.body.password || !req.body.player_name){
                res.status(400).send({message: "Username and/or password not provided, Try again!"});
            } 
            else{
               
                players.getPlayer(player_name,async (err,player)=>{
                    if(err){
                        res.status(500).send({error: "Error Logging into account, Try again later!"});
                    }
                    else{
                        const passwordMatch = await bcrypt.compare(req.body.password, player.password);

                        if(!passwordMatch) {
                        res.status(400).send({message: "Incorrect password"});
                        }
                        else{
                            req.session.player_name = player.player_name;
                            res.status(200).send({message: "Login Success " + req.session.player_name})
                        }
                    }
                });

                
            }
            
            
        }

    },
   createNewPlayer: async (req,res)=>{
    if(await checkifPlayerExists(req.body.player_name)){ 
        res.status(400).send({message: "User already exists,try changing your username"});
    }
    else{
        req.body.password = await bcrypt.hash(req.body.password, 10);
        players.createNewPlayer(req.body,(err)=>{
            if(err) res.status(500).send({error: "Error Creating new player!"})
            else res.status(200).send({message: "player Created!"}); 
        })
            
    }
       
   },
   getPlayer: (req,res)=>{

        if(!req.query.player_name){
            res.status(400).send({error: "'player_name' query is required!"});
        }
        else{
            players.getPlayer(req.query.player_name,(err,playerData)=>{
                if(err) res.status(500).send({error: "Server Error searching player"})
                else{
                    switch (playerData.length) {
                        case 0:
                            res.status(404).send({message: "Player does not exist!"})
                            break;
                    
                        default:
                            res.status(200).send(playerData[0]);
                            break;
                    }
                }
            })
        }

   },
   getAllPlayers: async (req,res)=>{
        await players.getAllPlayers((err,data)=>{
            if(err) res.status(500).send("Error fetching player list")
            else{
                    
                res.send(data);
            }
            
        });
        
   },
   deleteExistingPlayer : async (req,res)=>{

        const {player_name}  = req.params;
        if(players.getPlayerRole !== 1 || req.session.player_name !== player_name){ ///player_role 1 is the number of admin
            res.status(400).send({message: "Couldn't delete player!"})
        }  
        else {
            if(!player_name) res.status(400).send({error : "player name required for deletion!"});
            await players.deletePlayer(player_name, (err)=>{

                if(err) res.status(500).send("Error Deleting User From Database!")
                else{
                    req.session.destroy((err)=>{
                        if(err) res.status(500).send("Error Deleting User From Database!")
                        else res.status(200).send({message : "User deleted"});
                    })
                    
                }    
            })
        

        }
    },
   updatePlayerData : async (req,res)=>{
        const { player_name } = req.params
        const {Score} = req.body;

        if(!player_name ) res.status(400).send({error: "player_name is required!"});

        const playerData = {player_name, Score};
        
        await players.updatePlayerScore(playerData, (err)=>{
            if(err) res.status(500).send({error: "Failed To update Score"});
            
            else{
                res.status(200).send({message: "player Data updated Successfully"});
            }
        });

   },
   logout : (req,res)=>{
        req.session.destroy((err)=>{
            if(err) res.status(500).send({error: "Error terminating session"});
            else{
                res.status(200).send({message: "session terminated successfully"});
            }
        })
   }
} 
module.exports = playerController;