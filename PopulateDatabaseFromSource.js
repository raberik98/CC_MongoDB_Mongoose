import mongoose from "mongoose";
import CountryModel from "./models/Country.Model.js";
import fs from "fs/promises"
import env from "dotenv";
env.config();

async function Main() {
    await mongoose.connect(process.env.CONSTRING)
    console.log("Connected to database");

    const unparsedData = await fs.readFile("./backup/allCountry.json")
    console.log("Read backup data!");

    const parsedData = JSON.parse(unparsedData)
    console.log("Successfully parsed the backup data!");

    const convertedArray = []

    console.log("Preparing to iterate on the received data!");
    for (const key in parsedData) {
        convertedArray.push({
            name: parsedData[key].name,
            callingCode: parsedData[key].callingCode,
            flag: {
                small: parsedData[key].flag.small,
                medium: parsedData[key].flag.medium,
                large: parsedData[key].flag.large
            },
            comments: []
        })
    }
    console.log("Iteration was successful!");

    await CountryModel.create(convertedArray)
    console.log("Successfully saved the backup data to the database!");

    await mongoose.disconnect()
    console.log("Disconnected from the database!");

    console.log("Script shuts down");
}

Main()

