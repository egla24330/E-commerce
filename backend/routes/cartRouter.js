import express from 'express';
import {updateCart,getCart,addCart} from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';
const cartRouter = express.Router()
cartRouter.post('/add',auth,addCart)
cartRouter.post('/get',auth,getCart)
cartRouter.post('/update',auth,updateCart)

export default cartRouter