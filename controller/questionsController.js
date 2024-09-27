const questions = require("../Models/questionsModel");


const questionsController = {

    solveQuestionForPlayer : async (req,res)=>{
        const {playerID, player_name} = req.session;
        try {    
            const {questionsSolved} = req.body;

            await questions.solveQuestionForPlayer(playerID, questionsSolved)

            res.status(200).send({message: "Updated Solved question list for " })
        } catch (error) {
            res.status(500).send({error: `Failed to update solved questions for ${ player_name}`});
        }
        

    },
    getQuestions: (req,res)=>{
        const questionCategory = req.query.category;
        questions.getQuizQuestions(req.session.playerID ,questionCategory, (err,rows)=>{
            if(err) {
                res.status(500).send({message: "couldn't retrive questions from DB"});
            }
            else{
                for(let row of rows){
                    row.questionAnswers = JSON.parse(row.questionAnswers)
                }
                res.status(200).send(rows);
            }

        })
    },
    createNewQuestion : (req,res)=>{
        if(!req.body.questionString || !req.body.questionCategory || !req.body.questionAnswers || !req.body.questionCorrectAnswer){
            res.status(400).send({error: "Missing Question Info. check 'questionString', 'questionAnswers', 'questionCorrectAnswer' and 'questionCategory'"});
        }
        else{
            
            const data = req.body;
            questions.createNewQuestion(data, (err)=>{
                if(err) {
                    console.error("Error in Question Creation : " + err);
                    res.status(500).send({error : "Error creating Question, Try Again later."});
                }
                else{
                    res.status(200).send({message : "Question created Successfully!"});;
                }
            })
        }
        
    },
    deleteExistingQuestion : (req,res)=>{
        if(!req.query || !req.query.questionString || !req.query.category){
            res.status(400).send({error: "Missing Question Info. check URI queries"});

        }
        else{
            const { questionString, category} = req.query;
            questions.deleteQuestion({questionString,category}, (err)=>{
                if(err) res.status(500).send({error : "Error Deleting Question, Try Again later."});
                else{
                    res.status(200).send({message : "Question Deleted Successfully!"});;
                }
            })
        }
    }

}

module.exports = questionsController;