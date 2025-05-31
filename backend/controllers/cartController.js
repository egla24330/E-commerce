import userModel from "../models/userModel.js"
import orderModel from '../models/orderModel.js'
const addCart = async (req, res) => {

  try {
    const { userId, size, itemId } = req.body
    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      })
    }
    const cartData = user.cartData

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }


    await userModel.findByIdAndUpdate(userId, { cartData })
    res.json({
      success: true,
      message: "Item added to cart",
      data: cartData
    })


  } catch (er) {
    res.json({
      success: false,
      message: er.message
    })
  }
}

const getCart = async (req, res) => {
  const { userId } = req.body
  try {
    const order = await orderModel.find({ userId })
    // const cartData = await user.cartData
    res.json({
      success: true,
      message: "Cart fetched successfully",
      order
    })
  } catch (error) {
    res.json({
      success: false,
      message: error

    })
  }

}

const updateCart = async (req, res) => {
  const { userId, itemId, size, q } = req.body;

  try {
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData
    cartData[itemId][size] = q;


    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.json({ success: false, message: "Failed to add to cart" });
  }

}
export { updateCart, getCart, addCart }