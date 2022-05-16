require("dotenv").config()
const express = require("express")
const cors =require("cors")
const bodyParser =require("body-parser")

const type =process.env.TYPE || "DEV"
const PORT = process.env.PORT || 5000
const urlAllowed = process.env.URLALLOWED && process.env.URLALLOWED.split(",")

const app = express()

if (type==="PROD") {
    
    app.use(cors({origin:urlAllowed}))
} else {
    
}

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.listen(PORT,()=>console.log(`The Server Run On port : ${PORT} at ${type}.`))