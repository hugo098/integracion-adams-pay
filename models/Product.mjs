import mongoose from 'mongoose';
const { Schema } = mongoose;


export const ProductSchema = new Schema({  
    productName: {
        type: String,        
        trim: true,
        default: null,
        required: [true, 'The product name is required']
    },
    price: {
        type: Number,        
        required: [true, 'The product price is required']
    },
    productImage: {
        type: String, 
    }
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);

