const jwt = require("jsonwebtoken");

const jwt_secret = "iNotebook";

const fetchuser = async (req, res, next) => {
    try {
        let token = req.header('auth-token');
        if (!token)
        {
            return res.status(401).json({error:"plz authenticate using valid token"})
            
        }
        
        let data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    }
    catch (error)
    {
        console.log(error.message);
        return res.status(401).json({error:"plz authenticate using valid token"})
    }
}

module.exports = fetchuser;