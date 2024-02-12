import mongoose from "mongoose";
import QuestionsModel from "./models/Questions.model.js";
import fs from "fs/promises"
import CONSTRING from "./env.js"

async function Main() {
    try {
        await mongoose.connect(CONSTRING)
        console.log("Connected to database!");

        const unparsedData = await fs.readFile("./backup/backupQuestions.json", "utf-8")
        console.log("Read backup from file!");

        const data = JSON.parse(unparsedData)
        console.log("Parsed the data!");

        const editedData = data.map((nextData) => {
            return {
                title: nextData.title,
                description: nextData.description,
                date: nextData.date,
                answers: nextData.answers.map(nextAnswer => ( { answerText: nextAnswer.answerText, date: nextAnswer.date} ))
            }
        })
        console.log("Edited the data!");

        await QuestionsModel.deleteMany()
        console.log("Cleared the database!");

        await QuestionsModel.create(editedData)
        console.log("Restored backup!");

        await mongoose.disconnect()
        console.log("Disconnected from database!");

        console.log("Yaaay backup restored!");
    } catch (error) {
        console.log(`---ERROR: ${error}`);   
    }
}

Main()