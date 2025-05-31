import express from 'express'
import { submitContact,getContacts, deleteContacts} from '../controllers/contactController.js';
import adminMiddleware from '../middlewares/admin.js';
const contactRouter = express.Router();
contactRouter.get('/',adminMiddleware, getContacts);
contactRouter.post('/submit',submitContact);
contactRouter.delete('/:id',adminMiddleware, deleteContacts);

export default contactRouter;