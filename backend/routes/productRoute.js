import express from 'express';
import { singleProduct, listProduct, addProduct, removeProduct, resetAllData, getProductById, getForUpdate, updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import adminMiddleware from '../middlewares/admin.js';
const productRouter = express.Router();
productRouter.post('/add', adminMiddleware, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove', adminMiddleware, removeProduct);
productRouter.post('/reset-all-data', adminMiddleware, resetAllData);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);
productRouter.get("/:id", getProductById)
productRouter.get("/up/:id", getForUpdate)
productRouter.post("/up/:id", upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), updateProduct)
export default productRouter;   