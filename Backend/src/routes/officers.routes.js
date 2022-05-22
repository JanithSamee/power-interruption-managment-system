const { Router } = require("express");
const {getOfficer,signUp,signIn} =require("../controllers/officer.controller")


const officersRouter = Router();

officersRouter.post("/signUp",signUp)
officersRouter.post("/signIn",signIn)
officersRouter.get("/single",getOfficer)

module.exports = officersRouter;
