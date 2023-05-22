// const express = require("express")
// const mongoose = require('mongoose');
// const Question = require("./models/questions")
import express from "express";
import mongoose from "mongoose";
import Question from "./models/questions.js"
const app = express()
app.use(express.json());

app.get("/api/v1/getQuestions", (req,res) => {
    Question.find({}).then((data) => {
        let [e1,e2,e3] = data
        res.json(e2)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message:"Error occured"})
    })
})

app.get("/api/v1/getQuestionById/:_id", async (req,res) => {
    try {
        let data = await Question.findById(req.params._id)
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured"})
    }    
})

app.post("/api/v2/addQuestion", async (req,res) => {
    try {
        let newData = new Question()
        newData.userName = "New user"
        newData.questionTitle = "new Question title"
        let data = await newData.save()
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured"})
    }    
})

app.put("/api/v1/editTitle/:_id", async (req,res) => {
    try {
        await Question.findByIdAndUpdate(req.params._id, {userName: req.body.userName})
        res.status(200).json({message:"Update succesfull"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured"})
    } 
})

app.put("/api/v1/addAnswer/:id", async (req,res) => {
    try {
        let data = await Question.findById(req.params.id)
        // data.answers = [...data.answers, req.body.answer]
        data.answers.push(req.body.answer)
        await data.save()
        res.status(200).json({message:"Update succesfull"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured"})
    }
})

app.delete("/api/v1/deleteQuestion/:id", async (req,res) => {
    try {
        await Question.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Delete was successful"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured"})
    }
})

app.post("/api/v1/addQuestion", async (req,res) => {
    try {
        const data = req.body
        await Question.create(data)
        res.json({message: "New data have been registered"})
    } catch (error) {
        res.status(500).json({message:"Error occured"})
    }
})





mongoose.connect("mongodb://localhost:27017/test2").then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(3001, ()=> {
        console.log("App is running at port: 3001");
    })
}).catch((err) => {
    console.log(err);
})
