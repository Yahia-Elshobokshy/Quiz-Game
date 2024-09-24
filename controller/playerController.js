const players = require('../Models/playerModel');

async function checkifPlayerExists(player_name){
    return new Promise((resolve, reject) => {
        players.getPlayer(player_name, (err, data) => {
            if (err) {
                reject(err); 
            } else if (data.length > 0) {
                resolve(true); 
            } else {
                resolve(false); 
            }
        });
    });

}

const playerController = {
   createNewPlayer: async (req,res)=>{

   
    if(await checkifPlayerExists(req.body.player_name)){ 
        res.status(400).send({message: "User already exists,try changing your username"});
    }
    else{
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

    if(!player_name) res.status(400).send({error : "player name required for deletion!"});
    await players.deletePlayer(player_name, (err)=>{

        if(err) res.status(500).send("Error Deleting User From Database!")
        else{
            res.status(200).send({message : "User deleted"});
        }

    })

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

   }
} 
module.exports = playerController;