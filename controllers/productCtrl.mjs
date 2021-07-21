import { default as Product } from '../models/Product.mjs';


const listProducts = async () => {
    try {
        let products = await Product.find();               
        return products;    
    } catch (err) {       
        
    }
}

export{
    listProducts
}
