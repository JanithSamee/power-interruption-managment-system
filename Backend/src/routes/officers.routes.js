const { Router } = require("express");
const {getOfficer,signUp,signIn} =require("../controllers/officer.controller");
const officerMiddleware = require("../middlewares/officer.middleware");



const officersRouter = Router();

officersRouter.post("/signUp",signUp)
officersRouter.post("/signIn",signIn)
officersRouter.get("/single" ,officerMiddleware,getOfficer)

module.exports = officersRouter;
