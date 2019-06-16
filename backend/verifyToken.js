const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const bearer = req.headers['authorization'];
  if (typeof bearer !== 'undefined') {
    try {
      //verify token
      const token = bearer.split(' ')[1];
      const verified = jwt.verify(token, 'secretkey');
      req.user = verified;
      //go to next middleware
      next();
    } catch (err) {
      res.status(400).send('Invalid token!!!');
    }
  } else {
    return res.status(401).send('Access Denied!!!');
  }
}