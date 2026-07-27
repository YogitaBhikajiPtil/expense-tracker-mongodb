
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const fs = require('fs');


const connectDB = require("./dbConnection");

connectDB();
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");

const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });




app.use(express.json());
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));


const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Routes 
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const expenseRoutes = require("./routes/expenseRoutes");
app.use("/expenses", expenseRoutes);

const purchaseRoutes = require("./routes/purchaseRoutes");
app.use("/purchase", purchaseRoutes);

const passwordRoutes = require("./routes/passwordRoutes");
app.use("/password",passwordRoutes);

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});





    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });





app.use((err, req, res, next) => {
  fs.appendFileSync('error.log', `${err.message}\n`);
  res.status(500).json({ error: err.message });
});




















