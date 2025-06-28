import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios'

const botToken = '8104420367:AAGaW20GFPrjYTiYzXAIHjIL955UfCq2izI'; // const chatId = 5200971756
const chatIds = [6804194223];

// New Order Notification
const tgO = async (name, phone, price, cartItems) => {
  const item = cartItems.map(item => {
    const variantText = item.variant
      ? ' ' + Object.entries(item.variant).map(([key, val]) =>
        `${key.charAt(0).toUpperCase() + key.slice(1)}: ${val?.value}`
      ).join(', ')
      : '';

    return `- ${item.product?.name} (Qty: ${item.quantity}${variantText})`;
  }).join('\n')
  const newOrderMessage = `🛍️ *New Order Received!*\n\n` +
    `👤 Customer: ${name}\n\n` +
    `📞 Phone: +251${phone}\n\n` +
    `💰 Total Price: ${price}\n\n` +
    `📦 Items: ${item}\n\n` +
    `🧾 Please review it in the admin dashboard!\n\n` +
    `🎯 *Status*: _Pending verification_\n` +
    `\n🔗 Tap the button below to view the order:\n━━━━━━━━━━━━━━━`;

  const newOrderButtons = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📋 View in Dashboard",
            url: "https://e-commerce-backend-bo7f.onrender.com/admin/",
          }
        ]
      ]
    },
    parse_mode: 'Markdown'
  };

  for (const chatId of chatIds) {
    try {
      await axios.post(`https://api.telegram.org/bot${process.env.T_O}/sendPhoto`, {
        chat_id: chatId,
        photo: 'https://res.cloudinary.com/ddsvxw9i6/image/upload/v1749486505/sprou6apkepul2dmlxdh.png',
        caption: newOrderMessage,
        ...newOrderButtons,
      });
    } catch (err) {
      console.error(`❌ Failed to send to ${chatId}:`, err.message);
    }
  }



}


const tgV = async (photo, id) => {

  // Order Verification Message
  const verificationMessage = `🛠️ *Order Verification Required!*\n\n` +
    `🆔 *Order ID*: ${id}\n\n` +
    `🖼️ Please review the uploaded receipt and verify the order.\n` +
    `\n✅ Click below to verify:\n━━━━━━━━━━━━━━━`;

  const verificationButtons = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅ Verify Order",
            url: "https://e-commerce-backend-bo7f.onrender.com/admin/",
          }
        ]
      ]
    },
    parse_mode: 'Markdown'
  };

  for (const chatId of chatIds) {
    try {
      await axios.post(`https://api.telegram.org/bot${process.env.T_V}/sendPhoto`, {
        chat_id: chatId,
        photo: photo || 'https://res.cloudinary.com/ddsvxw9i6/image/upload/v1749486505/sprou6apkepul2dmlxdh.png',
        caption: verificationMessage,
        ...verificationButtons,
      });
    } catch (err) {
      console.error(`❌ Failed to send to ${chatId}:`, err.message);
    }
  }


}

const addOrder = async (req, res) => {
  try {
    let { form, paymentMethod, cartItems, totalPrice, userId } = req.body;

    //console.log("add Order data", form, paymentMethod, cartItems, totalPrice);
    let newOrder = new orderModel({
      customerInfo: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        deliveryArea: form.deliveryArea,
        subCity: form.subCity,
        address: form.address,
        deliveryLocation: form.deliveryLocation

      },
      paymentMethod: paymentMethod,
      cart: cartItems,
      totalPrice: totalPrice,
      receiptUrl: '',
      userId
    })


    let order = await newOrder.save();
    const name = form.name
    const phone = form.phone
    const price = totalPrice

    tgO(name, phone, price, cartItems)

    //await sendTelegramAlert({

    // });

    res.json({
      success: true,
      message: "Order added successfully",
      order: order._id,
    });


  } catch (error) {
    //  console.log("Error in addOrder", error.message);
    res.json({
      success: false,
      message: error,
    });

  }
}

const getOrder = async () => {
  let userId = req.body.userId;
  try {
    let order = await orderModel.find({ userId })
    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }
    res.json({
      success: true,
      message: "Order fetched successfully",
      order: order,
    });

  } catch (error) {
    //  console.log("Error in getOrder", error.message);
    res.json({
      success: false,
      message: error.message,
    });

  }
  try {



  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

  }

}

// used for for before up load verfication receipt find the order
const findOrder = async (req, res) => {
  const { id } = req.body
  console.log(id)

  try {
    // console.log(typeof userId)

    let order = await orderModel.findById(id)
    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }
    res.json({
      success: true,
      message: "Order fetched successfully",
      order: order,
    });

  } catch (error) {
    // console.log("Error in getOrder", error.message);
    res.json({
      success: false,
      message: error.message,
    });

  }
  try {
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

// for upload receipt
const updateOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const image = req.file;
    let imageUrls = [];

    if (image) {
      const r = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
      imageUrls.push(r.secure_url);

    }

    tgV(imageUrls[0], id)
    //Example: update the order with the receipt URL(s)
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { receiptUrl: imageUrls.length > 0 ? imageUrls[0] : '' },
      { new: true }
    );
    res.json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
/*const adminGetAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find()
    res.json({
      success: true,
      orders
    });
  } catch (err) {
    res.json({
      seccess: false,
      error: err
    });
  }
};*/

// GET /api/order/admin-orders?page=1&limit=6

const adminGetAllOrder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const totalOrders = await orderModel.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);
    const skip = (page - 1) * limit;

    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      orders,
      page,
      totalPages,
      totalOrders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};



// PATCH update order status
const updateStatusOrder = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending_verification', 'completed', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error(`[PATCH /admin/orders/${req.params.id}/status] Error:`, err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
}

const deleteOrder = async (req, res) => {
  try {
    const deleted = await orderModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(`[DELETE /admin/orders/${req.params.id}] Error:`, err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

const applyReferralRewards = async (buyerId, orderId, f, s) => {
  console.log('Applying referral rewards for buyer:', buyerId, 'Order ID:', orderId, 'First Level:', f, 'Second Level:', s);
  const buyer = await userModel.findById(buyerId);
  if (!buyer || !buyer.referredBy) return;

  const rewardedUsers = new Set();

  // Level 1 reward
  const level1 = await userModel.findOne({ referralCode: buyer.referredBy });
  if (level1 && !level1.referralRewards.some(r => r.orderId.toString() === orderId.toString())) {
    level1.coins += Number(f);
    level1.referralRewards.push({ buyerId, orderId });
    await level1.save();
    rewardedUsers.add(level1._id.toString());

    // Level 2 reward
    if (level1.referredBy) {
      const level2 = await userModel.findOne({ referralCode: level1.referredBy });
      if (level2 &&
        !rewardedUsers.has(level2._id.toString()) &&
        !level2.referralRewards.some(r => r.orderId.toString() === orderId.toString())) {
        level2.coins += Number(s);
        level2.referralRewards.push({ buyerId, orderId });
        await level2.save();
        rewardedUsers.add(level2._id.toString());
      }
    }
  }
};


const referralRewards = async (req, res) => {
  try {

    let { orderId, firstLevel, secondLevel } = req.body

    console.log('test', firstLevel, secondLevel)
    console.log("order id", orderId)
    let user = await orderModel.findById(orderId);
    //console.log("order", order.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }


    await applyReferralRewards(user.userId, orderId, firstLevel, secondLevel);

    res.status(201).json({ success: true, x: user.userId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addOrder, getOrder, getAllOrders, updateOrder, findOrder, adminGetAllOrder, deleteOrder, updateStatusOrder, referralRewards }

