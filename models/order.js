const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: String,

    status: String,

    paymentId: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);