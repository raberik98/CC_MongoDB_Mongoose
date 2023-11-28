import mongoose from "mongoose"

const questionsSchema = new mongoose.Schema({
    questionTitle: {
        type: String,
        required: true
    },
    questionDescription: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    answers: {
        type: [
            {
                answer: String,
                user: String
            }
        ],
        default: []
    }
})

export default mongoose.model("Question", questionsSchema, "questions")