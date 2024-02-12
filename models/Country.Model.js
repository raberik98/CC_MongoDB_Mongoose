import mongoose from "mongoose";
import flagSchema from "./Flag.Schema.js";


const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    callingCode: {type: String, required: true},
    date: { type: Date, default: Date.now },
    flag : flagSchema,
    ruler: String,
    comments: [String]
})

export default mongoose.model("Country", countrySchema, "countries")
// Név, Schema, kollekció