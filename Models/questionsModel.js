const { solveQuestionForPlayer } = require('../controller/questionsController');
const db = require('../Database/database');

const questions = {

    solveQuestionForPlayer : (player_name, solvedQuestions, callback)=>{

        const dbQuery = db.prepare('Insert into playerQuestions (player_name, questionID) values (?,?)');
        solvedQuestions.forEach(question => {
            dbQuery.run(player_name,question, (err)=>{
                if(err) callback(err)
                else callback(null)
            })
        });
        dbQuery.finalize();

    },
    getQuizQuestions : (quizCategory, callback)=>{

        if(quizCategory){
            const dbQuery = db.prepare("Select * From questions where questionCategory = ?");
            dbQuery.all(quizCategory, (err,rows)=>{
                if(err) callback(err,null)
                else{
                    callback(null,rows);
                }
            });
        }
        else{
            const dbQuery = db.prepare("Select Distinct * From questions ORDER by RANDOM() limit 1");
            dbQuery.all((err,rows)=>{
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