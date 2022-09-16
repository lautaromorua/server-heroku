import mongoose from "mongoose";

const schemaCart = new mongoose.Schema({
    productos: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'productos' },
            quantity: { type: Number }
        }
    ]
})

const Cart = mongoose.model('carritos', schemaCart)

export { Cart }

//import { contenedorMongo } from '../../containers/contenedorMongo.js';
/*
class CartDaoMongo extends contenedorMongo {
    constructor() {
        super('compras', {
            timestamp: { type: Date, required: true },
            productos: { type: Array, required: true }
        });
    }
}

export default CartDaoMongo;

*/