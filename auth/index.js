const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const secret = "CourseBookingAPI";
exports.auth = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
  requireAdmin: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (user.isAdmin) {
        next();
      } else {
        res.status(403).send({ error: "Forbidden" });
      }
    } catch (error) {
      res.status(403).send({ error: "Forbidden" });
    }
  },
};
