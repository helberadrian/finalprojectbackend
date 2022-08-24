import Cart from "../models/cart.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export const addProductCart = async (req, res) => {
    const user = req.userId;
    const { productId, cant } = req.body;
    const product = await Product.findById(productId);
    const cart = await Cart.find({userId: user});
    
    const newProduct = {product: productId, cant: cant}

    if (cart.length < 1) {
        if (product.length < 1) {
            res.status(204).json({message: "Product not Exists"});
        } else {
            const list = [];
            list.push(newProduct);
            const data = new Cart({
                userId: user,
                productId: list,
            });
    
            const cartSaved = await data.save();
            res.status(201).json(cartSaved);
        }
    } else {
        if (product.length < 1) {
            res.status(204).json({message: "Product not Exists"});
        } else {
            for (const carrito of cart) {
                if (carrito.userId === user) {
                    carrito.productId.push(newProduct);
                    const cartSaved = await carrito.save();
                    res.status(201).json(cartSaved);
                }
            }
        }
    }
};

export const getCart = async (req, res) => {
    const user = req.userId;
    const cart = await Cart.find({userId: user});

    if (cart.length < 1) {
        res.status(204).json({message: "There is no shopping cart for this user"});
    } else {
        res.status(200).json(cart);
    }
};

export const deleteProductCart = async (req, res) => {
    const user = req.userId;
    const productId = req.params;
    const product = await Product.findById(productId.productId);
    const cart = await Cart.find({userId: user});

    if (product.length < 1) {
        res.status(204).json({message: "Product not Exists"});
    } else {
        if (cart.length < 1) {
            res.status(204).json({message: "The user does not have a shopping cart"});
        } else {
            try {
                for (const carrito of cart) {
                    if (carrito.userId === user){
                        const result = carrito.productId.filter((item) => item.product != productId.productId);
                        carrito.productId = result
                        const cartSaved = await carrito.save();
                        res.status(200).json({message: "Success, product removed"});
                    }
                }
            } catch (err) {
                res.status(500).json({message: "error"})
            }
        }
    }
};

export const deleteCart = async (req, res) => {
    const user = req.userId;
    const cart = await Cart.find({userId: user});

    if (!cart) {
        res.status(204).json({message: "Cart not Exists"});
    } else {
        try {
            const result = await Cart.remove({userId: user});
            res.status(200).json({message: "Success, cart removed"});
        } catch (err) {
            res.status(500).json({message: "error"})
        }
    }
};