const {Router} =require("express")

const {submitBreakDown,submitHighConsumtions} =require("../controllers/device.controller")

const deviceRouter =Router()

deviceRouter.get("/submit/bd",submitBreakDown)
deviceRouter.get("/submit/hc",submitHighConsumtions)

module.exports= deviceRouter