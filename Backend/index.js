require("dotenv").config()
const app =require("./src/app")
const PORT = process.env.PORT || 5000
const type =process.env.TYPE || "DEV"

app.listen(PORT,()=>console.log(`The Server Run On port : ${PORT} at ${type}.`))
