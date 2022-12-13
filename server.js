const express = require("express")
const app = express()
const mongoose = require('mongoose')
const Question = require('./models/question.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/getQuestions', async (req,res) => {
    const data = await Question.find()
    if (data) {
        return res.status(200).json(data)
    }
    else {
        return res.status(500).json({"message":"Couldn't get data from MongoDB."})
    }
    
})

app.post('/api/postQuestion', (req,res) => {
    const data = req.body

    let newQuestion = new Question()
    newQuestion.userName = data.userName
    newQuestion.title = data.title
    newQuestion.question = data.question
    newQuestion.answers = []

    newQuestion.save().then(()=>{
        return res.status(200).json({"response":"Success!"})
    })
    .catch(() => {
        return res.status(400).json({"error":"Request was called incorrectly."})
    })
})

app.put('/api/editQuestion/:_id', async (req,res) => {
    const questionId = req.params._id
    const data = req.body

    let editThisQuestion = await Question.findOne({"_id": questionId})

    editThisQuestion.title = data.title
    editThisQuestion.question = data.question

    editThisQuestion.save().then(()=>{
        return res.status(200).json({"response":"Question successfully edited!"})
    })
    .catch(() => {
        return res.status(400).json({"error":"Request was called incorrectly."})
    })
})

app.post('/api/postAnswer/:_id', async (req,res) => {
    const questionId = req.params._id
    const data = req.body


    let editThisQuestion = await Question.findOne({"_id": questionId})
    let currentAnswers = editThisQuestion.answers
    currentAnswers.push({"answeringUserName": data.answeringUserName, "answerText": data.answerText})

    

    editThisQuestion.save().then(()=>{
        return res.status(200).json({"response":"Question successfully edited!"})
    })
    .catch(() => {
        return res.status(400).json({"error":"Request was called incorrectly."})
    })
})



mongoose.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log("MongoDB connection was successful.");
}).catch(()=>{
    console.log("MongoDB connection failure!");
})
app.listen(3000)