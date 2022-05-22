/**
 * The unit that notified the breadowns and high consumtions. 
*/

// TODO: register a device with given device list


const { Router } = require("express");

const {
  submitBreakDown,
  submitHighConsumtions,
  getDevice,
  addDevice,
  activateDevice,
  updateDevice,
  getDevicesByregion,
  getAllDevices,
  updateFixedBreakdown,
} = require("../controllers/device.controller");

const deviceRouter = Router();

deviceRouter.post("/add", addDevice);
deviceRouter.patch("/update", updateDevice);
deviceRouter.get("/updatedAsFixed/:id", updateFixedBreakdown);
deviceRouter.post("/activate", activateDevice);
deviceRouter.get("/single/:devid", getDevice);
deviceRouter.get("/all/region/:region", getDevicesByregion);
deviceRouter.get("/all", getAllDevices);
deviceRouter.get("/submit/bd", submitBreakDown);
deviceRouter.get("/submit/hc", submitHighConsumtions);

module.exports = deviceRouter;
