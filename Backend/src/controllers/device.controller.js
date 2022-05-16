const Device = require("../models/device.model")

/* ------------------- Add a Device ------------------- */
const addDevice = async (req, res) => {
  try {
    const {devID,location,region,lastBreakDown} = req.body;
    const data = await Device.create({devID,location,region,lastBreakDown})
    res.json({ msg: "success", err: false, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", err: true, data: error });
  }
};

/* ------------------- Get a Device by ID ------------------- */
const getDevice = async (req, res) => {
  try {
    const devID = req.params.devid;
    const data = await Device.find({devID})
    res.json({ msg: "success", err: false, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", err: true, data: error });
  }
};

/* ------------------- Submit a Breakdown ------------------- */
const submitBreakDown = async (req, res) => {
  try {
    const location = req.query.devid;
    console.log(location);
    res.json({ msg: "success", err: false, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", err: true, data: error });
  }
};

/* ------------------- Submit a High Consumtion ------------------- */
const submitHighConsumtions = async (req, res) => {
  try {
    const location = req.query.devid;
    console.log(location);
    res.json({ msg: "success", err: false, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", err: true, data: error });
  }
};

module.exports = {
  addDevice,
  getDevice,
  submitBreakDown,
  submitHighConsumtions
};
