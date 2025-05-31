import express from 'express';
import {addOrder,getOrder,getAllOrders,updateOrder,findOrder,adminGetAllOrder,deleteOrder,updateStatusOrder,referralRewards} from '../controllers/orderController.js';
import { uploadReceipt } from '../middlewares/uploadReceipt.js';
import auth from '../middlewares/auth.js';
import adminMiddleware from '../middlewares/admin.js';
const orderRouter = express.Router();
// Route to create a new order
orderRouter.post('/add',auth,addOrder);
orderRouter.post('/find-order', findOrder);
orderRouter.get('/get',auth,getAllOrders);
orderRouter.post('/upload-receipt',uploadReceipt, updateOrder);
orderRouter.get('/admin-orders',adminMiddleware,adminGetAllOrder)
orderRouter.delete('/:id',adminMiddleware,deleteOrder)
orderRouter.patch('/:id/status',adminMiddleware,updateStatusOrder)
orderRouter.post('/referral-rewards', referralRewards);
export default orderRouter;
