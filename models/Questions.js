import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
    questionTitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: [
            {
                answerText: String,
                answerName: String
            }
        ],
        default: []
    }
})

export default mongoose.model("Question", QuestionsSchema, "questions")