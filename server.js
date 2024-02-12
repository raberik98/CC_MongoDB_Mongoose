import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
// import CONSTRING from "./env.js";
env.config();
import QuestionsModel from "./models/Questions.model.js";

const app = express();

app.use(express.json());

app.get("/api/v1/question", async (req, res) => {
  try {
    const data = await QuestionsModel.find();

    res.json(data);
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});

app.get("/api/v1/question/:_id", async (req, res) => {
  try {
    const data = await QuestionsModel.findOne({_id: req.params._id});
    // const data = await QuestionsModel.findById(req.params._id);

    res.json(data);
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});

app.post("/api/v1/question", async (req, res) => {
  try {
    // const newData = {
    //   title: req.body.title,
    //   description: req.body.description
    // }
    // await QuestionsModel.create(newData)

    const newData = new QuestionsModel({
      title: req.body.title,
      description: req.body.description
    })

    await newData.save()

    res.status(201).json({message: "Successfully added a question"})
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});

app.patch("/api/v1/question/:_id", async (req, res) => {
  try {
    
    const editedData = await QuestionsModel.findOneAndUpdate(
      {_id: req.params._id},
      {description: req.body.description},
      {new: true}
    )

    res.status(200).json(editedData)
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});

app.post("/api/v1/answer/:_id", async (req, res) => {
  try {
    
    // const editedData = await QuestionsModel.findByIdAndUpdate(
    //   req.params._id,
    //   { $push: { answers: { answerText: req.body.answer } } },
    //   {new: true}
    // )

    const editThis = await QuestionsModel.findById(req.params._id)

    editThis.answers.push({ answerText: req.body.answer })

    await editThis.save()

    res.status(200).json(editThis)
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});

app.patch("/api/v1/answer/:questionId/:answerId", async (req, res) => {
  try {
    
    // const editedData = await QuestionsModel.findByIdAndUpdate(
    //   req.params._id,
    //   { $push: { answers: { answerText: req.body.answer } } },
    //   {new: true}
    // )

    const editThis = await QuestionsModel.findById(req.params.questionId)

    const editThisAnswer = editThis.answers.find((nextAnswer) => nextAnswer._id == req.params.answerId)

    editThisAnswer.answerText = req.body.answer

    await editThis.save()

    res.status(200).json(editThis)
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});

app.delete("/api/v1/question/:_id", async (req, res) => {
  try {
    await QuestionsModel.findByIdAndDelete(req.params._id)

    res.status(200).json({message: "Question have been deleted!"})
  } catch (error) {
    res
      .json(500)
      .json({ message: "Upsz something went wrong, please try again later!" });
  }
});




mongoose
  .connect(process.env.CONSTRING)
  .then(() => {
    console.log("Successfully connected to database!");
    app.listen(3000, () => {
      console.log("App is runnint at port: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
