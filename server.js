// const express = require("express")
// const mongoose = require('mongoose');
// const Question = require("./models/questions")
import express from "express";
import mongoose from "mongoose";
import Question from "./models/questions.js"
// import env from "dotenv"
// import Asd123 from "./models/asd123.js"
const app = express()

// const {CONSTRING} = env()

app.use(express.json())
app.use(express.text())

app.use("/", (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

let backupData = []

app.post("/api/v1/addNewQuestion", async (req,res) => {
    try {
        await Question.create(req.body)
        res.json({message: "Successfully added a new question"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.post("/api/v2/addNewQuestion", async (req,res,next) => {
    try {
        let newQuestion = new Question()
        newQuestion.userName = req.body.userName
        newQuestion.questionTitle = req.body.questionTitle
        await newQuestion.save()
        res.json({message: "Successfully added a new question"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.get("/api/v1/getAllData", async (req,res) => {
    try {
        let data = await Question.find({userName: "Erik1"})
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})


app.get("/api/v1/getDataById/:id", async (req,res) => {
    try {
        let data = await Question.findById(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.get("/api/v1/getDataParameters", async (req,res) => {
    try {
        let data = await Question.findOne({userName: "Erik4"})
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.put("/api/v1/editQuestion/:id", async (req,res) => {
    try {
        let userName = req.body.userName
        let questionTitle = req.body.questionTitle
        await Question.findByIdAndUpdate(req.params.id, { userName: userName, questionTitle: questionTitle })
        res.json({message: "Edit have been successful"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.put("/api/v1/addAnswer/:id", async (req,res) => {
    try {
        let newAnswer = req.body.newAnswer
        let editThisQuestion = await Question.findById(req.params.id)
        // editThisQuestion.answers = [...editThisQuestion.answers, newAnswer]
        editThisQuestion.answers.push(newAnswer)
        let response = await editThisQuestion.save()
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.put("/api/v2/addAnswer/:id", async (req,res) => {
    try {
        let response = await editThisQuestion.findByIdAndUpdate(req.params.id, {$push: { answers: req.body.newAnswer }})
        //Reminder,check the syntax
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.delete("/api/v1/deleteQuestion/:id", async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id)
        res.json({message: "Delete was successful!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.get("/api/v1/createABackup", async (req,res) => {
    try {
        backupData = await Question.find()
        res.send("Ok backup is ready")
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})   
    }
})

app.delete("/api/v1/clearCollection", async (req,res) => {
    try {
        await Question.deleteMany()
        res.send("Delete was successful")
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})
    }
})

app.post("/api/v1/restoreBackup", async (req,res) => {
    try {
        let newData =  backupData.map((item) => ( {userName: item.userName, questionTitle: item.questionTitle, answers: item.answers} ))
        backupData = await Question.create(newData)
        res.send("Backup data restored")
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Some error occured"})   
    }
})





mongoose.connect("mongodb://127.0.0.1:27017/test2").then(() => {
    console.log("Connection to the database have been successful!");
    app.listen(3001, () => {
        console.log("App is running at port: 3001");
    })
}).catch((err) => {
    console.log(err);
})
