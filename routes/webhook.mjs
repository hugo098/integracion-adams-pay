import express from 'express';
import md5 from 'md5'
import Debts from '../models/Debts.mjs';
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        console.log('WEBHOOK')
        //adams{"notify":{"id":"id-unico-de-notificacion","type":"(tipo)","version":1,"time":"hora de generación","merchant":"id-de-tu-comercio","app":"id-de-tu-aplicación","env":"ambiente"},"debt":{"docId":"id-de-deuda","objStatus":{"status":"active","time":"2020-05-02T13:51:16+00:00"},"payStatus":{"status":"pending","time":"2020-05-02T13:51:16+00:00"}}}a2ffb3633aee020e53336f6aa4384ce1
        //243eb6edccdf2e01f81698d407918c55
        let hash = md5('adams' + JSON.stringify(req.body) + 'a2ffb3633aee020e53336f6aa4384ce1')
        let hashReq = req.headers['x-adams-notify-hash']
        console.log('adams' + JSON.stringify(req.body) + 'a2ffb3633aee020e53336f6aa4384ce1');
        console.log("HASH CON REQ.BODY: " + hash);
        console.log("HASH CABECERA: " + hashReq)
        console.log(md5('adams'+ req.rawBody + 'a2ffb3633aee020e53336f6aa4384ce1'))
        //console.log(req.rawBody)
        /*if (hash != hashReq) {
            throw new Error('Firma inválida');
        }*/
        if (req.body.notify.type === 'debtStatus') {
            await actualizarEstado(req.body.debt);
        }

        return res.status(200).json({});
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.message });
    }
});

const actualizarEstado = async (debtReq) => {
    let docId = debtReq.docId;
    let debt = await Debts.findById(docId);
    if (!debt) throw new Error("Debt not found")

    if(debtReq.payStatus.status === 'paid'){
        debt.status = 'Paid'
    }

    debt.save();    
}

export default router;