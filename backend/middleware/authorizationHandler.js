const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;


    if(!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401);
        return next(new Error("Not an authorized user!!"))
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(401);
            return next(new Error("Not an authorized user!!"));
        }
        req.user = decoded.user;
        next();
    })
}

module.exports = verifyToken
