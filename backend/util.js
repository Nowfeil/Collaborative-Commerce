const jwt = require('jsonwebtoken');
const config = require('./config.js');

const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const isAuth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) return res.status(401).send({msg:'No token, authorization denied'})
    try{
        const onlyToken = token.slice(7,token.length)
        const decoded = jwt.verify(onlyToken,config.JWT_SECRET);
        req.user = token;
        next();
    }catch(err){
        return res.status(400).send({msg:'Invalid token'})
    }
}

const isAdmin = (req,res,next)=>{
    if(!req.user.isAdmin) return res.status(401).send({msg:'You are not an Admin'})
    return next();
}
module.exports = { getToken,isAdmin,isAuth };
