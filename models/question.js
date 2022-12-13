const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userName: 
    {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: 
    {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answers: [
        {
            answeringUserName: {
                type: String
            },
            answerText: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Question', questionSchema, 'questions');
// név, séma, kollekció
