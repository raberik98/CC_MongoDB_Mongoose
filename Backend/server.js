import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import CountryModel from "./models/Country.Model.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// import CONSTRING from "./env.js";
env.config();

const app = express();

app.use(express.json());


app.use("/assets/", express.static(`${__dirname}/dist/assets/`));

app.get("/", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
})

app.get("/api/v1/country/all", async (req,res) => {
  try {
      const allData = await CountryModel.find()

      res.json(allData)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})

app.get("/api/v1/country/id/:_id", async (req,res) => {
  try {
      const selectedData = await CountryModel.findById(req.params._id)

      res.json(selectedData)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})

app.get("/api/v1/country/callinCode/:ccode", async (req,res) => {
  try {
      const selectedData = await CountryModel.findOne({callingCode: req.params.ccode})

      res.json(selectedData)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})


app.post("/api/v1/country/comment/id/:_id", async (req,res) => {
  try {
      const editedData = await CountryModel.findByIdAndUpdate(
        req.params._id, 
        {$push: { comments: req.body.comment } },
        { new: true }
      )

      res.json(editedData)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})



app.post("/api/v2/country/comment/id/:_id", async (req,res) => {
  try {
      const editedData = await CountryModel.findById(req.params._id)

      editedData.comments.push(req.body.comment)

      await editedData.save()

      res.json(editedData)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})


app.patch("/api/v2/country/setRuler/id/:_id", async (req,res) => {
  try {
      const editedData = await CountryModel.findOneAndUpdate(
        {_id: req.params._id},
        {ruler: req.body.ruler},
        {new: true}
      )

      res.json(editedData)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})


app.delete("/api/v2/country/id/:_id", async (req,res) => {
  try {
      await CountryModel.findOneAndDelete(
        {_id: req.params._id},
      )

      res.json({message: "The selected country have been deleted!"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured, please try again later!"})
  }
})


mongoose.connect(process.env.CONSTRING).then(() => {
  app.listen(process.env.BACKEND_PORT , () => {
    console.log("Backend is runnong at port: " + process.env.BACKEND_PORT);
  })
}).catch((err) => {
  console.log("CANNOT CONNECT TO THE DATABASE!!!");
  console.log(err);
})