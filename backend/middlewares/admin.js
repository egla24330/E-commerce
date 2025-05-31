import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: 'config.env' })
function adminMiddleware(req, res, next) {
    const {token} = req.headers
    try {
       
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
         let pass =process.env.ADMIN_PASS
         if(pass !== decoded){
            return res.json({
                success:false,
                message:'unauthorized'
            })

         }

      
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
export default  adminMiddleware