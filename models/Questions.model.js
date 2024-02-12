import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
                answerText: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }
})

export default mongoose.model("Question", questionsSchema, "questions")