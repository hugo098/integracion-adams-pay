import express from 'express';
const router = express.Router();

import {
    listProducts   
} from '../controllers/productCtrl.mjs';

/*router.route('/')
    .get(listProducts)*/


export default router;