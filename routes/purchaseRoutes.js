const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");
const userAuthentication = require("../middleware/auth");
//const premiumController = require("../controllers/premiumController")


router.get("/premium", userAuthentication.authenticate, purchaseController.purchasePremium);

router.post(
  "/updateTransactionStatus",
  userAuthentication.authenticate,
  purchaseController.updateTransactionStatus
);

router.get("/premium/showLeaderboard",userAuthentication.authenticate,
purchaseController.showLeaderBoard
);

module.exports = router;