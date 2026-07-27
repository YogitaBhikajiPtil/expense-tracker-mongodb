const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const userAuthentication = require("../middleware/auth")
const {checkPremium} = require("../middleware/premium");


router.post("/add", userAuthentication.authenticate,expenseController.addExpense);
router.get("/get",userAuthentication.authenticate, expenseController.getExpenses);
router.delete('/delete/:id', userAuthentication.authenticate,expenseController.deleteExpense);

router.get(
  "/report",
  userAuthentication.authenticate,
  checkPremium,
  expenseController.getReport
);

router.get(
  "/download",
  userAuthentication.authenticate,
  checkPremium,
  expenseController.downloadExpenses
);



module.exports = router;