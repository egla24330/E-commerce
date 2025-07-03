import express from 'express';
import { loginUser, registerUser, adminLogin,firebase,userData,countUser,telegramAuth: } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import adminMiddleware from '../middlewares/admin.js'
const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/me',auth,userData)
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/google-auth', firebase);
userRouter.get('/user-count',adminMiddleware,countUser)
userRouter.post("/telegram-login",telegramAuth)
export default userRouter;