import mongoose from "mongoose";
import Question from "./Models/Question.js";
import fs from "fs"
import env from "dotenv";
// import CONSTRING from "./env.js";
env.config();

async function Main () {
    await mongoose.connect(process.env.CONSTRING)
    console.log("Connected to database!");

    const questions = await Question.find()
    console.log("Fetched all data from the database!");

    fs.writeFile("./Backup/Questions.json", JSON.stringify(questions), "utf-8", async (err) => {
        if (err) {
            console.log("FAILED to create a backup!");
            console.log(err);

            await mongoose.disconnect()
            console.log("Disconnected from the database!");
        }
        else {
            console.log("Successfully created a backup");
            await mongoose.disconnect()
            console.log("Disconnected from the database!");
        }
    })

}

Main()
