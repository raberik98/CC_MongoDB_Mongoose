import mongoose from "mongoose"

const flagSchema = new mongoose.Schema({
    small: String,
    medium: String,
    large: String
})

export default flagSchema