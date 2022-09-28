const Device = require("../models/device.model");

/* ------------------- Add a Device ------------------- */
const addDevice = async (req, res) => {
    try {
        const { devID, location, region } = req.body;
        const data = await Device.create({ devID, location, region });
        res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        if (error.codeName === "DuplicateKey" || error.code === 11000) {
            return res
                .status(500)
                .json({ msg: "device-exist", err: true, data: error });
        }
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};

/* ------------------- update a Device ------------------- */
const updateDevice = async (req, res) => {
    try {
        const { id, devID, location, region } = req.body;

        const data = await Device.findByIdAndUpdate(
            id,
            { devID, location, region },
            { new: true }
        );
        if (!data) {
            return res
                .status(404)
                .json({ msg: "not-found", err: true, data: {} });
        }
        return res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        if (error.codeName === "DuplicateKey" || error.code === 11000) {
            return res
                .status(500)
                .json({ msg: "device-exist", err: true, data: error });
        }
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};

/* ------------------- updated as fixed a Device ------------------- */
const updateFixedBreakdown = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Device.findByIdAndUpdate(
            id,
            { isunderBreakdown: false },
            { new: true }
        );
        if (!data) {
            return res
                .status(404)
                .json({ msg: "not-found", err: true, data: {} });
        }
        res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};
/* ------------------- activate a Device ------------------- */
const activateDevice = async (req, res) => {
    try {
        const { id, activate } = req.body;
        const data = await Device.findByIdAndUpdate(
            id,
            { isActive: activate },
            { new: true }
        );
        if (!data) {
            return res
                .status(404)
                .json({ msg: "not-found", err: true, data: {} });
        }
        res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};

/* ------------------- Get a Device by ID ------------------- */
const getDevice = async (req, res) => {
    try {
        const devID = req.params.devid;
        const data = await Device.findOne({ devID });
        if (!data) {
            return res
                .status(404)
                .json({ msg: "not-found", err: true, data: {} });
        }
        res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};
/* ------------------- Get all Devices by region ------------------- */
const getDevicesByregion = async (req, res) => {
    try {
        const region = req.params.region;
        const data = await Device.find(
            { region, isActive: true },
            { createdAt: 0, updatedAt: 0 }
        );
        if (!data) {
            return res
                .status(404)
                .json({ msg: "not-found", err: true, data: {} });
        }
        res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};
/* ------------------- Get all Devices by region ------------------- */
const getAllDevices = async (req, res) => {
    try {
        let searchFilter = req.query;
        console.log(searchFilter);
        searchFilter = searchFilter ? searchFilter : {};
        const data = await Device.find(searchFilter);
        if (!data) {
            return res
                .status(404)
                .json({ msg: "not-found", err: true, data: {} });
        }
        res.json({ msg: "success", err: false, data: data });
    } catch (error) {
        res.status(500).json({ msg: "error", err: true, data: error });
    }
};

/* ------------------- Submit a Breakdown ------------------- */
const submitBreakDown = async (req, res) => {
    try {
        const devID = req.query.devid;
        const data = await Device.findOneAndUpdate(
            { devID, isActive: true },
            { lastBreakdown: new Date(), isunderBreakdown: true },
            { new: true }
        );
        if (!data) {
            return res.status(404).send("not-found");
        }
        res.send("success");
    } catch (error) {
        res.status(500).send("error");
    }
};

/* ------------------- Submit a High Consumtion ------------------- */
const submitHighConsumtions = async (req, res) => {
    try {
        const devID = req.query.devid;
        const current = req.query.current;
        const data = await Device.findOne({ devID, isActive: true });
        if (!data) {
            return res.status(404).send("not-found");
        } else {
            data.highConsumtions = {
                recordedTime: new Date(),
                count: current,
            };
            await data.save();
            res.send("success");
        }
    } catch (error) {
        res.status(500).send("error");
    }
};

module.exports = {
    addDevice,
    updateDevice,
    updateFixedBreakdown,
    activateDevice,
    getDevice,
    getDevicesByregion,
    getAllDevices,
    submitBreakDown,
    submitHighConsumtions,
};
