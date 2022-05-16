require("./db/mongoose")
const express = require("express")
const cors =require("cors")
const bodyParser =require("body-parser")

const router =require("./routes/_index.routes")

const type =process.env.TYPE || "DEV"

const urlAllowed = process.env.URLALLOWED && process.env.URLALLOWED.split(",")

const app = express()

if (type==="PROD") {
    app.use(cors({origin:urlAllowed}))
} else {
    
}

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(router)

module.exports=app