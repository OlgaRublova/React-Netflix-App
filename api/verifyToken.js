const jwt = require("jsonwebtoken");

//  next is need, so the next function was called (req, res)
function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    //  must be " " not just "" because there is space in the token
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        // "403" - forbidden
        res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
