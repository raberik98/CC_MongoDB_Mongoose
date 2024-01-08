import mongoose from "mongoose";
import fs from "fs"
import env from "dotenv";
import Questions from "./models/Questions.js";
env.config();

async function main() {

    try {
        await mongoose.connect(process.env.CONSTRING)
        console.log("Successfully connected to the database!");

        const data = await Questions.find()
        console.log("Requested all the data!");

        fs.writeFile("./backup/QuestionsBackup.json", JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Backup created successfully!");
            }
        })

        await mongoose.disconnect()
        console.log("Disconnected from database!");
    } catch (error) {
        console.log("ERROR: ", error);
    }


}

main()