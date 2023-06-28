const { promisify } = require('util')
const jwt = require('jsonwebtoken')
let users= []
const signtoken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.signUp= (req, res)=>{

    if(req.body.password !== req.body.passwordConfirm)
    {
        return res.status(401).json({
            message:"password doesn't match passwordConfirm"
        })
    }

    const user= users.find(obj=> req.body.email === obj.email)
    if(user) return res.status(400).json({
        error: "the input email is already exist"
    })
    let newUser= {
        _id: users.length + 1,
        email: req.body.email,
        password: req.body.password
    }

    users.push(newUser)

    const token = signtoken(newUser._id)

    res.status(201).json({
        success: "true"
    })

}

exports.login= (req, res)=>{
    const{email, password}= req.body
    const user= users.find(obj=> obj.email === email)

    if(!user) return res.status(404).json({
        error: "invalid email or password"
    })
    if(user.password !== password) return res.status(401).json({
        error: "invalid email or password"
    })
    const token = signtoken(user._id)

    res.status(200).json({
        email,
        password,
        token
    })
}

exports.protect=async (req, res, next)=>{
    try{

    
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) throw new Error('you are not logged in! please login to get access')
 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    
    const currenthUser= users.find(obj=> decoded.id === obj._id)

    if (!currenthUser) throw new Error('The user belonging to this token does no longer exist')

    next()
}catch(err){
    res.status(401).json({
        error: err.message
    })
}
}