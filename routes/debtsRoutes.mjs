import express from 'express';
const router = express.Router();

import {
    listDebts ,
    createDebt,
    debtByID,
    updateDebt  
} from '../controllers/debtsCtrl.mjs';

import {
    listProducts   
} from '../controllers/productCtrl.mjs';

router.route('/')
    .get(listDebts)

router.route('/generate-debt')
    .post(createDebt)

router.route('/update-debt/:id')
    .put(updateDebt)
    
router.get('/new-debt', async (req,res)=>{
    const products = await listProducts();
    res.render('debt-form', {
        products: products
    })
})

router.param('id', debtByID)

export default router;