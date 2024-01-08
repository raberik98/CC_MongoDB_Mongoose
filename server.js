import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import Questions from "./models/Questions.js";
// import CONSTRING from "./env.js";
env.config();

const app = express();

app.use(express.json());

app.get("/api/getAllQuestions", async (req,res) => {
  try {
    const questions = await Questions.find({})
    res.json(questions)
  } catch (error) {
    res.status(500).json({message: "Unexpected error occured"})
  }
})

app.get("/api/getSpecificQuestion/:_id", async (req,res) => {
  try {
    const data = await Questions.findOne({_id: req.params._id})

    res.json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured"})
  }
})

app.post("/api/askQuestion", async (req,res) => {
  try {
    let newQuestion = await Questions.create(req.body)
    res.json(newQuestion)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured"})
  }
})

app.post("/api/postAnswer/:questionId", async (req,res) => {
  try {
    // const currentQuestion = await Questions.findById(req.params.questionId)
    // currentQuestion.answers.push(req.body)
    // await currentQuestion.save()

    const currentQuestion = await Questions.findByIdAndUpdate(
        req.params.questionId,
        {$push: { answers: req.body }},
        {new: true}
      )

    res.json(currentQuestion)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured"})
  }
})

app.delete("/api/deleteQuestion/:questionId", async (req,res) => {
  try {
    await Questions.findOneAndDelete({_id: req.params.questionId})
    res.json({message: "Deleted"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured"})
  }
})



mongoose.connect(process.env.CONSTRING).then(() => {
  console.log("Connected to database!");
  app.listen(process.env.BACKEND_PORT, () => {
    console.log("App is running on port: 3000");
  })
}).catch((err) => {
  console.log(err);
})

