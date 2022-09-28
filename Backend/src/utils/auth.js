const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AT_SECRET = process.env.AT_SECRET;
const RT_SECRET = process.env.RT_SECRET;

module.exports = {
  signup: async (Model, userdata) => {
    const pwhash = await bcrypt.hash(userdata.password, 10);
    const _res = await Model.create({ ...userdata, passwordHash: pwhash });
    return _res;
  },

  async signin  (Model, username, password)  {
    const user = await Model.findOne({ username });
    if (!user) {
      throw "user-not-found";
    } else {
      if (await bcrypt.compare(password, user.passwordHash)) {
        const accessToken = this.genrateToken(
          {
            uid: user._id,
            username: user.username,
            email: user.email,
            role: Model.modelName + "-" + user.userRole,
          },
          "AT",
          "600s"
        );
        const refreshToken = this.genrateToken(
          {
            uid: user._id,
            username: user.username,
            email: user.email,
            role: Model.modelName + "-" + user.userRole,
          },
          "RT",
          "2d"
        );
        user.refreshToken = refreshToken;
        await user.save();
        const { passwordHash, ..._user } = user._doc;
        _user.accessToken = accessToken;
        _user.refreshToken = refreshToken;

        return _user;
      } else {
        return { msg: "password-incorrect" };
      }
    }
  },
  genrateToken (data, scretType, expTime)  {
     const secret = scretType === "RT" ? RT_SECRET : AT_SECRET;
     return jwt.sign(data, secret, { expiresIn: expTime });
   },
   verifyToken (token, scretType)  {
     const secret = scretType === "RT" ? RT_SECRET : AT_SECRET;
     return jwt.verify(token, secret);
   },
   
 
};

// const genrateToken= (data, scretType, expTime) => {
//      const secret = scretType === "RT" ? RT_SECRET : AT_SECRET;
//      return jwt.sign(data, secret, { expiresIn: expTime });
//    }
// const   verifyToken= (token, scretType) => {
//      const secret = scretType === "RT" ? RT_SECRET : AT_SECRET;
//      return jwt.verify(token, secret);
//    }