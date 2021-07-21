import { default as Debt } from '../models/Debts.mjs';


const listDebts = async (req, res) => {
    try {
        let debts = await Debt.find();
        /*return res.status(200).json({
            debts
        });*/
        console.log(debts)
        return res.status(200).render('debts', { debts: debts });
    } catch (err) {
        return res.status(400).json({
            err
        });
    }
}

const debtByID = async (req, res, next, id) => {
    try {
        let debt = await Debt.findById(id);
        if (!debt)
            return res.status(400).json({
                error: "Debt not found"
            });
        req.id = id;
        req.debt = debt;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve the debt",
            stack: err
        });
    }
}

const updateDebt = async (req, res) => {
    let debt = req.debt;
    debt.payUrl = req.body.payUrl;    
    try {
        await debt.save();
        return res.status(200).json({ debt });
    } catch (dbErr) {
        return res.status(400).json({
            error: dbErr
        });
    }

}


const createDebt = async (req, res) => {
    const debt = new Debt(req.body)
    try {
        await debt.save();       
        
        return res.status(201).json({
            message: "Debt successfully created",
            debt: debt,            
        });
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
}

export {
    listDebts,
    createDebt,
    debtByID,
    updateDebt
}