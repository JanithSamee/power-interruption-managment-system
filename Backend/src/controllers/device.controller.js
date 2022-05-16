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
  submitBreakDown,
  submitHighConsumtions
};
