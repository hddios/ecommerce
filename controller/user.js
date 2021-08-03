var { User } = require("../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const secret = "CourseBookingAPI";

module.exports.checkEmailExists = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports.userRegister = async (req, res) => {
  try {
    let newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      //hashSync is a function of bcrypt that encrypts the password, and the 10 is a number of times it runs the encryption
    });
    //.save()
    // user: {
    //     isAdmin: false,
    //     _id: 61043797e9a4251bd24ed4c8,
    //     email: 'ali@gmail.com',
    //     password: '$2b$10$zE3i/3Aorbpx1aIsNGb9PeD3h1mSw2ge3iNbu.KOzB8BKnkm7gSn6',
    //     orders: [],
    //     __v: 0
    //   }
    newUser.save().then((user, err) => {
      if (err) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      console.log(userExists);
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        userExists.password
      ); //returns boolean
      if (isPasswordCorrect) {
        console.log("Password correct");
        const user = { userExists };
        const access_token = jwt.sign(user, secret);
        console.log({ access_token });
        res.send({
          accessToken: access_token,
        });
      }
    } else {
      res.send({ message: "User already exists" });
    }
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user) {
      user.password = "*******";
      res.send(user);
    } else {
      res.send({ message: "User does not exits = with this ID " });
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports.makeUserAdmin = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.body.userId, {
      isAdmin: true,
    });
    res.send(updateUser);
  } catch (error) {
    res.send(error);
  }
};

module.exports.updateUserById = async (req, res) => {
  try {
    let { isAdmin, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin, email, password },
      { new: true }
    );
    updateUser.password ="*******"
    res.send(updateUser);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.password = "********";
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};
