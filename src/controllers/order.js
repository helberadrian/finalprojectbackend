import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import { buyOrderMail } from "../libs/nodemailer.js";

export const createOrder = async (req, res) => {
    const user = req.userId;
    const cart = await Cart.find({userId: user});
    const productsBuyOrder = []

    if (!cart) {
        res.status(204).json({message: "Cart not Exists"});
    } else {
        const carrito = cart[0];

        if (carrito.productId.length === 0) {
            res.status(204).json({message: "Shopping cart is empty"});
        } else {
            for (const product of carrito.productId){
                const item = await Product.find({_id: product.product});
                const element = item[0];
                const itemSave = {
                    id: element._id,
                    name: element.name,
                    description: element.description,
                    price: element.price,
                    cant: product.cant
                }
                productsBuyOrder.push(itemSave);
            }

            const order = new Order({
                userId: user,
                cart: productsBuyOrder
            })
            const orderSaved = await order.save();
            const mailSend = await buyOrderMail(order);
            res.status(201).json(orderSaved);
        }
    }
};

export const getOrders = async (req, res) => {
    const user = req.userId;
    const orders = await Order.find({userId: user});
    return res.json(orders);
  };