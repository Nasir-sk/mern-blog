import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signin = async(req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password || email === '' || password ===''){
        naxt(errorHandler(400, 'All fields are required'));
    }
    try{
        const validUser = await User.findOne({ email});
        if(!validUser){
           return next(errorHandler(404, 'User not found'));  
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandler(400, 'Invalid  password'))
        }
        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest} = validUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
    }catch(error){
        next(error);
    }
};
export default signin;