import mongoose from "mongoose";
import CountryModel from "./models/Country.Model.js";
import fs from "fs/promises"
import env from "dotenv";
env.config();

async function Main() {
    await mongoose.connect(process.env.CONSTRING)
    console.log("Connected to database");

    const allData = await CountryModel.find()
    console.log("Requested all the data from the database!");

    await fs.writeFile("./backup/backupCountry.json", JSON.stringify(allData), "utf-8")
    console.log("Backup file successfully created!");

    await mongoose.disconnect()
    console.log("Disconnected from the database!");

    console.log("Script shuts down");
}

Main()

