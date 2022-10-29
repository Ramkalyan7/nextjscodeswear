import User from "../../models/User";
import connectDb from "../../middleware/mogoose";
import CryptoJS from "crypto-js";
var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.email === user.email && req.body.password == decryptedPass) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
