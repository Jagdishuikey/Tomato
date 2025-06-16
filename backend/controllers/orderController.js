// Import models and Stripe
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Place Order Controller
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { userId, items, amount, address } = req.body;

    // Save order to DB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line_items setup
    const line_items = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(Number(item.price) * 100), // price in paise
      },
      quantity: item.quantity,
    }));

    // ✅ Add fixed delivery charge
    const deliveryCharge = 50; // in INR
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: deliveryCharge * 100 // Convert to paise
      },
      quantity: 1
    });

    console.log("line_items:", line_items);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ success: false, message: 'Checkout error' });
  }
};

// ✅ Get orders for user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: "Error retrieving orders" });
  }
};

// ✅ Admin - List all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Admin Order Listing Error:", error);
    res.status(500).json({ success: false, message: "Error listing orders" });
  }
};

const verifyOrder=async(req,res) => {
    const{orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }


}

const updateStatus =async(req,res)=>{
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
}

// ✅ Export all controllers
export { placeOrder, userOrders, listOrders,verifyOrder ,updateStatus};
