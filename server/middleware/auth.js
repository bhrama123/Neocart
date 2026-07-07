const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

const token = req.headers.authorization;

if(!token)
return res.status(401).json("No token");

const decoded = jwt.verify(token,"secret123");

req.userId = decoded.id;

next();

}