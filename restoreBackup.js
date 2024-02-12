import mongoose from "mongoose";
import CountryModel from "./models/Country.Model.js";
import fs from "fs/promises"
import env from "dotenv";
env.config();

async function Main() {
    await mongoose.connect(process.env.CONSTRING)
    console.log("Connected to database");

    await CountryModel.deleteMany()
    console.log("Successfully cleared the database!");

    const unparsedData = await fs.readFile("./backup/backupCountry.json")
    console.log("Successfully read the backup JSON file!");

    const parsedData = JSON.parse(unparsedData)
    console.log("Successsfully parsed the previously read data!");

    const formatedData = parsedData.map((nextElement) => {
        const returnThis = {
            name: nextElement.name,
            callingCode: nextElement.callingCode,
            flag: {
                small: nextElement.flag.small,
                medium: nextElement.flag.medium,
                large: nextElement.flag.large
            },
            comments: nextElement.comments,
        }

        if (nextElement.ruler) {
            returnThis.ruler = nextElement.ruler
        }

        return returnThis
    })
    console.log("Successfully formated the backup data!");

    await CountryModel.create(formatedData)
    console.log("Successfully retored the backup data!");


    await mongoose.disconnect()
    console.log("Disconnected from the database!");

    console.log("Script shuts down");
}

Main()

