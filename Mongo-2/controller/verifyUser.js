const jwt = require("jsonwebtoken");
const User = require("../model/registerModel");

const veryifyUser=async (req,res,next)=>{
    try{
        const [_,token] =req.headers.authorization?.split(' ');
        console.log(token);
        const decode = jwt.verify(token,'alsaeed17108646');
        const findUser =await User.findOne({email:decode});
        if (!findUser || findUser.token !== token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    req.user=findUser;
    next();
    }catch(err){
        return res.status(401).json({
            status:"error",
            message:"unauthenticated"
        });
    }
}

module.exports = veryifyUser;