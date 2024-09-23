const sqlite = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS players (
                player_name TEXT NOT NULL PRIMARY KEY UNIQUE ,
                Score Number NOT NULL default 0
            )
        `);
        
        db.run(`
            CREATE TABLE IF NOT EXISTS questions (
                questionString TEXT NOT NULL ,
                questionAnswers TEXT NOT NULL ,
                questionAnswerIndex Number NOT NULL ,
                questionCategory TEXT not NULL
            )
        `);
    }
});

module.exports = db;