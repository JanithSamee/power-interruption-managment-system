const mongoose=require("mongoose")
const URL =process.env.MONGODB_URL

try {
  
  mongoose.connect(URL)
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
} catch (error) {
  console.error(error)
}