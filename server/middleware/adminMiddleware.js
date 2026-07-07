const User = require("../models/user");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.headers.userid);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};