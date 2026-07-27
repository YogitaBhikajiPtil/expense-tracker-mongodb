const Expense = require("../models/expense");
const User = require("../models/user");
const { Parser } = require("json2csv");

// ================= ADD EXPENSE =================

const addExpense = async (req, res) => {
  try {

    const { amount, description, category, note } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const expense = await Expense.create({
      amount,
      description,
      category,
      note,
      userId: req.user._id
    });

    req.user.totalExpense += Number(amount);

    await req.user.save();

    res.status(201).json(expense);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error adding expense",
      error: err.message
    });

  }
};

// ================= GET EXPENSES =================

const getExpenses = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalExpenses = await Expense.countDocuments({
      userId: req.user._id
    });

    const expenses = await Expense.find({
      userId: req.user._id
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({

      expenses,

      currentPage: page,

      hasNextPage: page * limit < totalExpenses,

      hasPreviousPage: page > 1,

      nextPage: page + 1,

      previousPage: page - 1,

      lastPage: Math.ceil(totalExpenses / limit)

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// ================= DELETE EXPENSE =================

const deleteExpense = async (req, res) => {

  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    req.user.totalExpense -= expense.amount;

    await req.user.save();

    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }

};

// ================= GET REPORT =================

const getReport = async (req, res) => {
  try {
    const { filter } = req.query;

    let startDate = new Date();

    if (filter === "daily") {
      startDate.setHours(0, 0, 0, 0);
    } else if (filter === "weekly") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (filter === "monthly") {
      startDate.setMonth(startDate.getMonth() - 1);
    }

    const expenses = await Expense.find({
      userId: req.user._id,
      createdAt: {
        $gte: startDate
      }
    }).sort({ createdAt: -1 });

    return res.json(expenses);

  } catch (err) {
    console.log("REPORT ERROR:", err);

    res.status(500).json({
      message: "Error fetching report"
    });
  }
};

// ================= DOWNLOAD EXPENSES =================

const downloadExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find({
      userId: req.user._id
    });

    const data = expenses.map((expense) => ({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: expense.createdAt
    }));

    const parser = new Parser();

    const csv = parser.parse(data);

    res.json({
      fileURL: `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
    });

  } catch (err) {

    console.log("DOWNLOAD ERROR:", err);

    res.status(500).json({
      message: "Error downloading file"
    });

  }
};

// ================= EXPORTS =================

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  getReport,
  downloadExpenses
};