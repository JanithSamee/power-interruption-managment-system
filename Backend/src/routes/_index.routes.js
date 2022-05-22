const {Router} =require("express")

const deviceRouter = require("./device.routes")
const officersRouter = require("./officers.routes")

const router =Router()

router.use("/device",deviceRouter)
router.use("/officer",officersRouter)

module.exports= router

