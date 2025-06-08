import  express from 'express';
import chatbotController from '../controllers/chatbotController.js';
const chatbotRouter = express.Router();
chatbotRouter.post('/chat',chatbotController)
export default chatbotRouter;