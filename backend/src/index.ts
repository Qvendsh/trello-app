import express from "express"
import cors from "cors";
import {listRouter} from "./routers/list.router";
import {cardRouter} from "./routers/card.router";
import mongoose from "mongoose";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const PORT = 5000


app.use('/lists', listRouter)
app.use('/cards', cardRouter)


app.listen(PORT, async ()=>{
    await mongoose.connect("mongodb+srv://barchyshynyura:djbw85hUG2j6GN4I@cluster0.ixhbpgk.mongodb.net/")
    console.log(`Server running on port: ${PORT}`)
})