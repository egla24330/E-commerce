import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: 'config.env' })
const auth = async(req, res, next) => {
    const {token} = req.headers
    if (!token) {
        return res.json({success:false, message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decoded', decoded)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        return res.json({success:false,message: 'Internal server error' })
        
    }
}
export default auth