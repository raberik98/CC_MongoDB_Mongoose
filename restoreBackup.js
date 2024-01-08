import mongoose from "mongoose";
import fs from "fs"
import env from "dotenv";
import Questions from "./models/Questions.js";
env.config();

async function main() {

    try {
        await mongoose.connect(process.env.CONSTRING)
        console.log("Successfully connected to the database!");

        fs.readFile("./backup/QuestionsBackup.json", "utf-8", async (err,data) => {
            if (err) {
                console.log(err);
            }else {
                console.log("Successfully read the file");

                const parsedData = JSON.parse(data)

                const editedData = parsedData.map((item) => {
                    return {
                        questionTitle: item.questionTitle, 
                        name: item.name,
                        date: item.date,
                        answers: item.answers.map((answerItem) => { return { 
                            answerText: answerItem.answerText,
                            answerName: answerItem.answerName 
                        } })
                    }
                })

                console.log("Data fromating successful!");

                await Questions.deleteMany()
                console.log("Database cleared!");

                await Questions.create(editedData)
                console.log("Backup restored!");

                await mongoose.disconnect()
                console.log("Disconnected from database!");
            }
        })

    } catch (error) {
        console.log("ERROR: ", error);
    }


}

main()