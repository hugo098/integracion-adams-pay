import mongoose from 'mongoose';
const { Schema } = mongoose;

export const DebtsSchema = new Schema({  
    amount:{
        type: Number,       
    },
    status:{
        type: String,
    },
    payUrl:{
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Debts', DebtsSchema);