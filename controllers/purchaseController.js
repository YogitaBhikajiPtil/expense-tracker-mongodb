const Order = require("../models/order");
const cashfree = require("../services/cashfreeService");
const User = require("../models/user");

// ================= PURCHASE PREMIUM =================

exports.purchasePremium = async (req, res) => {
  try {

    const orderId = "order_" + Date.now();

    await Order.create({
      orderId,
      status: "PENDING",
      userId: req.user._id
    });

    const request = {
      order_id: orderId,
      order_amount: 100,
      order_currency: "INR",
      customer_details: {
        customer_id: req.user._id.toString(),
        customer_email: req.user.email,
        customer_phone: "9999999999"
      }
    };

    const response = await cashfree.PGCreateOrder(request);

    res.json({
      payment_session_id: response.data.payment_session_id,
      orderId
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ================= UPDATE PAYMENT STATUS =================

exports.updateTransactionStatus = async (req, res) => {
  try {

    const { orderId, paymentId, status } = req.body;

    await Order.findOneAndUpdate(
      { orderId },
      {
        paymentId,
        status
      }
    );

    if (status === "SUCCESSFUL") {
      req.user.isPremiumUser = true;
      await req.user.save();
    }

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
};

// ================= LEADERBOARD =================

exports.showLeaderBoard = async (req, res) => {
  try {

    const users = await User.find(
      {},
      {
        name: 1,
        totalExpense: 1
      }
    ).sort({
      totalExpense: -1
    });

    res.json(users);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }
};