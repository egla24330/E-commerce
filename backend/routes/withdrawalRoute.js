import express from 'express'
const withdrawRouter = express.Router();
import { createWithdrawal,updateCoin,getAllWithdrawals,deleteWithdrawal} from '../controllers/withdrawalController.js';
import auth from '../middlewares/auth.js'
import adminMiddleware from '../middlewares/admin.js'
withdrawRouter.post('/withdrawal-request', createWithdrawal);
withdrawRouter.post('/withdrawal-update',auth,updateCoin)
withdrawRouter.post('/get-all-withdrawal',getAllWithdrawals)
withdrawRouter.delete('/delete-withdrawal/:id',adminMiddleware,deleteWithdrawal)

/*/ Get all withdrawals
withdrawRouter.get('/', getWithdrawals);

// Get a single withdrawal by ID
withdrawRouter.get('/:id', getWithdrawalById);

// Update a withdrawal by ID
withdrawRouter.put('/:id', updateWithdrawal);

// Delete a withdrawal by ID
withdrawRouter.delete('/:id', deleteWithdrawal);

;*/
export default withdrawRouter;