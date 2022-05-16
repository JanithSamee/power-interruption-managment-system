const {Router} =require("express")

const {submitBreakDown,submitHighConsumtions,getDevice,addDevice} =require("../controllers/device.controller")

const deviceRouter =Router()

deviceRouter.post("/add",addDevice)
deviceRouter.get("/single/:devid",getDevice)
deviceRouter.get("/submit/bd",submitBreakDown)
deviceRouter.get("/submit/hc",submitHighConsumtions)

module.exports= deviceRouter