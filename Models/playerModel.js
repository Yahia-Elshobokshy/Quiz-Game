const db = require('../Database/database')

const players = {

    getAllPlayers: async (callback) => {

        const getScreenQuery = db.prepare('SELECT * FROM players');
        getScreenQuery.all( (err, rows)=>{

            if(err){
                console.log("ERR: " + err);
                return callback(err)
            }
            callback(null, rows);
        });
       getScreenQuery.finalize();

    },
    createNewPlayer: async (playerData, callback)=>{
        const dbQuery = db.prepare("Insert into players (player_name,Score) values(?,0)")
        dbQuery.run(playerData.player_name, function(err){
            if(err){
                console.error("Error creating new Player!\n" + err);
            }
            else{
                console.log("Player Registered!");
            }


        });
        dbQuery.finalize();
    },
    deletePlayer: async (player_name, callback)=>{
       
        const dbQuery = db.prepare("Delete From players where player_name = ?");
        dbQuery.run(player_name, function(err){
            if(err) callback(err);

            else callback(null);    
            
        });
        dbQuery.finalize();

    },
    updatePlayerScore: async (playerData, callback)=>{

        const dbQuery = db.prepare("UPDATE players SET Score = ? WHERE player_name = ?")

        dbQuery.run(playerData.Score, playerData.player_name, (err)=>{
            if(err) callback(err);
            
            else callback(null)
        })
    }

}

module.exports = players;