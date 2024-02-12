import mongoose from "mongoose";
import QuestionsModel from "./models/Questions.model.js";
import fs from "fs/promises"
import CONSTRING from "./env.js"

async function Main() {
    try {
        await mongoose.connect(CONSTRING)
        console.log("Connected to database!");

        const data = await QuestionsModel.find()
        console.log("Data requested from database!");

        await fs.writeFile("./backup/backupQuestions.json", JSON.stringify(data), "utf-8")
        console.log("Saved data to file!");

        await mongoose.disconnect()
        console.log("Disconnected from the database!");

        console.log("Yaaay success!");

    } catch (error) {
        console.log(`---ERROR: ${error}`);   
    }
}

Main()