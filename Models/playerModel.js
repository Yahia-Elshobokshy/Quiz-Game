const db = require('../Database/database')

const players = {

    getPlayerRole : (player_name)=>{

        const dbQuery = db.prepare('SELECT player_role from players where player_name = ?')
        dbQuery.all((err,rows)=>{
            if(err) throw err
            else{
                return rows[0];
            }
        })

    },
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
    getPlayer: async (player_name,callback)=>{

       
        const dbQuery = db.prepare("Select * from players Where player_name = ?")
        dbQuery.all(player_name, (err,rows)=>{
            if(err) callback(err)
            else {
       
                callback(null,rows[0]);
                
            }
        })

    },
    createNewPlayer: async (playerData, callback)=>{


        const dbQuery = db.prepare("Insert into players (player_name,password) values(?,?)")
        dbQuery.run(playerData.player_name, playerData.password, function(err){
            if(err){
                
                callback(err)
            }
            else{
               
                callback(null)
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
        dbQuery.finalize();
    }
    

}

module.exports = players;