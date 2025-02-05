// creating signed token
// create token for user and get user details from token for verification
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.JWT_SECRET;
// console.log(secret) ;
function makeToken(userObj) {
  // console.log("token",userObj);
  const payload = {
    email: userObj.email,
    id: userObj.id,
  };
  return jwt.sign(payload, secret, { expiresIn: '1h'});
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
    return null;
  }
}

const authMiddleware = (req, res, next) => {
  const token = req.cookies.mycookie; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token expired, generate a new one
        const newToken = jwt.sign(
          { id: decoded.id, email: decoded.email }, 
          process.env.JWT_SECRET, 
          { expiresIn: "1h" } // Set expiration
        );

        res.cookie("mycookie", newToken, {
          httpOnly: true,
          secure: false,  // Set to true in production (HTTPS required)
          sameSite: "None",
        });
      } else {
        return res.status(403).json({ message: "Invalid Token" });
      }
    } 

    next(); // Proceed to the next middleware
  });
};


module.exports = {
  authMiddleware,
  makeToken,
  getUser,
};
