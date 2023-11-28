import express from "express";
import mongoose from "mongoose";
import Question from "./Models/Question.js";
import env from "dotenv";
// import CONSTRING from "./env.js";
env.config();

const app = express();

app.use(express.json());

app.get("/api/v1/getQuestions", async (req, res) => {
  try {
    const data = await Question.find()
    const returnData = data.map((item) => (
      {questionTitle: item.questionTitle,
      questionDescription: item.questionDescription, 
      answers: item.answers}
    ))

    if (returnData.length > 0) {
      res.json(returnData)
    }else {
      res.status(404).json({message: "No available data!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured, please try again later!"})
  }
})


app.get("/api/v1/getSpeicificQuestion/:id", async (req, res) => {
  try {
    const data = await Question.findOne({_id: req.params.id})

    if (data) {
      res.json(data)
    }else {
      res.status(404).json({message: "No available data!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured, please try again later!"})
  }
})

app.post("/api/v1/askQuestion", async (req,res) => {
  try {
    let obj = {
      questionTitle: req.body.questionTitle,
      questionDescription: req.body.questionDescription
    }
    await Question.create(obj)
    res.status(201).json({message: "Questions registered!"})

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured, please try again later!"})
  }
})

app.put("/api/v1/postAnswer/:id", async (req, res) => {
  try {
    const answer = {answer: req.body.answer, user: req.body.user}
    // const selectedQuestion = await Question.findById(req.params.id)

    // selectedQuestion.answers.push(answer)

    // await selectedQuestion.save()

    const selectedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {$push: {answers: answer}},
      { new: true }
    )

    res.json({message: "Answer successfully posted!"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured, please try again later!"})
  }
})

app.patch("/api/v1/editQuestion/:id", async (req,res) => {
  try {
    const query = req.query.what
    if (query == "title") {
      const editedData = await Question.findByIdAndUpdate(
        req.params.id, 
        { questionTitle: req.body.questionTitle}, 
        { new: true })
      res.json(editedData)
    }
    else if (query == "description") {
      const editedData = await Question.findByIdAndUpdate(
        req.params.id, 
        { questionDescription: req.body.questionDescription }, 
        { new: true })
      res.json(editedData)
    }
    else {
      const editedData = await Question.findByIdAndUpdate(
        req.params.id, 
        { questionTitle: req.body.questionTitle, questionDescription: req.body.questionDescription }, 
        { new: true })
      res.json(editedData)
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured, please try again later!"})
  }
})


app.delete("/api/v1/deleteQuestion/:id", async (req,res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Unexpected error occured, please try again later!"})
  }
})

mongoose.connect(process.env.CONSTRING).then(() => {
  console.log("Successfully connected to database!");
  app.listen(3000, () => {
    console.log("Server is running at port 3000!");
  })
}).catch((err) => {
  console.log(err);
})


