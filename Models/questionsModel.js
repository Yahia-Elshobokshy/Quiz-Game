const { solveQuestionForPlayer } = require('../controller/questionsController');
const db = require('../Database/database');

const questions = {

    solveQuestionForPlayer : async (playerID, solvedQuestions, callback)=>{

        const dbQuery = db.prepare('Insert into playerQuestions (playerID, questionID) values (?,?)');
        solvedQuestions.forEach(question => {
            dbQuery.run(playerID,JSON.stringify(question), (err)=>{
                if(err) throw new Error(err)
            })
        });
        dbQuery.finalize();

    },
    getQuizQuestions : (playerID, quizCategory, callback)=>{

        if(quizCategory){
            const dbQuery = db.prepare("Select Distinc * From questions where questionCategory = ? AND questionID NOT IN (Select questionID from playerQuestions WHERE playerID = ?) ORDER by RANDOM() limit 1");
            dbQuery.all(quizCategory,playerID, (err,rows)=>{
                if(err) callback(err,null)
                else{
                    callback(null,rows);
                }
            });
        }
        else{
            const dbQuery = db.prepare("Select Distinct * From questions WHERE questionID NOT IN (Select questionID from playerQuestions WHERE playerID = ?) ORDER by RANDOM() limit 1");
            dbQuery.all(playerID , (err,rows)=>{
                if(err) callback(err)
                else{
                    callback(null,rows);
                }
            });
        }
        

    },
    createNewQuestion : (quizData, callback)=>{
        const dbQuery = db.prepare("Insert into questions (questionString, questionAnswers, questionCorrectAnswer,questionCategory) values (?,?,?,?)");
        console.log("quizData : " + quizData + '\n----' + quizData.questionAnswers);
        dbQuery.run(quizData.questionString, JSON.stringify(quizData.questionAnswers), quizData.questionCorrectAnswer,quizData.questionCategory, (err)=>{
            if(err) callback(err)
            else callback(null);
        })
        dbQuery.finalize()
    },
    deleteQuestion : (quizData, callback) => {
        const dbQuery = db.prepare("DELETE from questions where questionString = ? AND questionCategory = ? ");
        dbQuery.run(quizData.questionString, quizData.category, (err)=>{
            if(err) callback(err)
            else callback(null);
        })
        dbQuery.finalize();
    }



}

module.exports = questions;