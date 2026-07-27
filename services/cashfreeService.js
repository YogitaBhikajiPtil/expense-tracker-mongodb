const { Cashfree } = require("cashfree-pg");

console.log("APP ID:", process.env.CASHFREE_APP_ID);
console.log("SECRET:", process.env.CASHFREE_SECRET_KEY);

const cashfree = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

module.exports = cashfree;