const players = require('../Models/playerModel');

const playerController = {
   createNewPlayer: async (req,res)=>{

    players.createNewPlayer(req.body)
    res.send("Creation success!");
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