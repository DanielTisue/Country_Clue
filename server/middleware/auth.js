const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    
    const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({errorMessage: "Unauthorized"});
    }

    const verified = jwt.verify(token, process.env.SERIALIZE_CONFIG);
    req.user = verified.user;

  } catch(err) {
    console.log(err);
    res.status(401).json({errorMessage: "Unauthorized"});
  }
  next();
}

module.exports = auth;