const {Router} =require("express")

const deviceRouter = require("./device.routes")

const router =Router()

router.use("/device",deviceRouter)

module.exports= router

