import bcrypt from 'bcryptjs'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import generateReferralCode from '../utils/generateReferralCode.js'

dotenv.config({ path: 'config.env' })

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1y",
    })
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({
                success: true,
                message: 'login successful',
                token

            })
        } else {
            res.json({
                success: false,
                message: 'invalid credential '

            })
        }


    } catch (er) {
        res.json({
            success: false,
            message: er.message
        })
    }


}

const registerUser = async (req, res) => {

    try {

        const { name, password, email, referralCode } = req.body
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        // Validating 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            coins: 0,
           referredBy: referralCode
        });
        let code;
        let cond = true
        while (cond) {
            code = generateReferralCode()
            const exists = await userModel.findOne({ referralCode: code })
            if (!exists) {
                cond = false
            }
        }
        newUser.referralCode = code
        const user = await newUser.save();
        const token = createToken(user._id)

        if (user) {
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                token,


            })

        } else {
            res.json({
                success: false,
                message: "samething went wrong",
            })

        }

    } catch (er) {
        res.json({
            success: false,
            message: er.message
        })
    }

}

//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { user, password } = req.body
        let x = process.env

        if (user == x.ADMIN_USER && password == x.ADMIN_PASS) {
            const token = jwt.sign(password, x.JWT_SECRET)
            res.status(200).json({
                success: true,
                token,
            })

        } else {
            res.json({
                success: false,
                message: "invalid credential",
            })

        }

    } catch (er) {
        res.json({
            success: false,
            message: er.message
        })
    }

}
const firebase = async (req, res) => {
    try {
        const { googleId, name, email, avatar, referralCode } = req.body;
        let user = await userModel.findOne({ googleId });
        if (!user) {
            user = new userModel({ avatar,googleId, name, email, coins: 0, referredBy: referralCode || null, });

            let code;
            let cond = true
            while (cond) {
                code = generateReferralCode()
                const exists = await userModel.findOne({ referralCode: code })
                if (!exists) {
                    cond = false
                }
            }
            user.referralCode = code
            await user.save();
        }
        await user.save();
        const token = createToken(user._id)
        res.json({ success: true, user, token });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const userData = async (req, res) => {
    try {
        
        const user = await userModel.find({ _id: req.body.userId })
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

    let userData={
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            coins: user[0].coins,
            referralCode: user[0].referralCode,
            //referredBy: user[0].referredBy,
            avatar: user[0].avatar || null
    }

        res.json({
            success: true,
            userData
            
        });
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
}
 const countUser =async (req,res)=>{
    try {
        const user = await userModel.find()
        res.json({
            success:true,
            userLength:user.length
            

        })

        
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:'internal sever error',

        })
    }
    
 }


export { loginUser, registerUser, adminLogin, firebase, userData,countUser};
