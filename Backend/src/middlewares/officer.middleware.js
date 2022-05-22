const Officer = require("../models/officer.model");
const auth = require("../utils/auth");

const officerMiddleware = async (req, res, next) => {
  try {
    const auth_token =
      req.headers.authorization &&
      req.headers.authorization.replace("Bearer ", "");
    if (auth_token) {
      const user = auth.verifyToken(auth_token, "AT");
      const { iat, exp, ...rest } = user;
      res.set({
        Authorization: "Bearer " + auth.genrateToken(rest, "AT", "600s"),
      });
      req.user = user;
      next();
    } else {
      const _rt =
        req.cookies["_rt"] && req.cookies["_rt"].replace("Bearer ", "");
      if (!_rt) {
        return res
          .status(401)
          .json({ msg: "no-auth-token", err: true, data: {} });
      }
      const user = auth.verifyToken(_rt, "RT");

      if (user) {
        const { iat, exp, ...rest } = user;
        const dbuser = await Officer.findOne(
          { id: user.uid, refreshToken: _rt },
          "NIC"
        );
        if (!dbuser) {
          return res
            .status(401)
            .json({ msg: "auth-token-mismatch", err: true, data: {} });
        }
        res.set({
          Authorization: "Bearer " + auth.genrateToken(rest, "AT", "600s"),
        });
        req.user = user;
        next();
      } else {
        throw new Error("inavalid-token");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error", err: true, data: error });
  }
};

module.exports = officerMiddleware;
