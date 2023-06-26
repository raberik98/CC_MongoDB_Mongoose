// const mongoose = require("mongoose")
import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    questionTitle: {
        type: String,
        default: "Default question."
    },
    score: Number,
    date: {
        type: Date,
        default: Date.now()
    },
    answers: {
        type: [String],
        default: []
    }
})

export default mongoose.model("Question", questionSchema, "questions")
// module.exports = mongoose.model("Question", questionSchema)
//név,schema,collection