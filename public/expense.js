const form = document.getElementById("expenseForm");
const table = document.getElementById("expenseTable");

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
} else {
    document.body.style.display = "block";
}


// 🔹 Add new expense
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value
  const token = localStorage.getItem("token");

const res = await axios.post(
  "http://localhost:3000/expenses/add",
  {
    amount,
    description,
    category,
    note
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
 
const limit = localStorage.getItem("limit") || 10;

await getExpenses(1, limit);

  form.reset();
});

// 🔹 Show expense in table
function showExpense(expense) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${expense.amount}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
     <td>
      <button onclick="deleteExpense(${expense.id}, this)">
        Delete
      </button>
    </td>
  `;

  table.appendChild(row);
}

async function deleteExpense(id, button) {
  const token = localStorage.getItem("token");

  await axios.delete(`http://localhost:3000/expenses/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });


  const limit = localStorage.getItem("limit") || 10;

await getExpenses(1, limit);
}

//This initializes Cashfree payment gateway in test mode.
const cashfree = Cashfree({
  mode: "sandbox"
}); 

document.getElementById("buyPremiumBtn").onclick = async function () {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:3000/purchase/premium",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  console.log("Response:", response.data);

  const orderId = response.data.orderId;
  const sessionId = response.data.payment_session_id;

  try {
  
    cashfree.checkout({
      paymentSessionId: sessionId,
      redirectTarget: "_modal"  
    });

   
    await axios.post(
      "http://localhost:3000/purchase/updatetransactionstatus",
      {
        orderId: orderId,
        paymentId: "demo_payment",
        status: "SUCCESSFUL"
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Calling updateTransactionStatus");
    alert("Transaction Successful");
    localStorage.removeItem("token");
     alert("Please login again to activate premium");
     window.location.href = "login.html";
   // location.reload();

  } catch (error) {
    alert("TRANSACTION FAILED");
  }

};


//This extracts user data from JWT token.
function parseJwt(token){
 return JSON.parse(atob(token.split('.')[1]));
}

if (token) {
    const user = parseJwt(token);

    if (user.isPremiumUser) {

  const msg = document.createElement("h3");
  msg.textContent = "You are a premium user now";
  document.body.appendChild(msg);

  //  Leaderboard Button
  const btn = document.createElement("button");
  btn.textContent = "Show Leaderboard";
  btn.onclick = showLeaderboard;
  document.body.appendChild(btn);

  //  FILTER BUTTONS
  const dailyBtn = document.createElement("button");
  dailyBtn.textContent = "Daily";
  dailyBtn.onclick = () => fetchReport("daily");

  const weeklyBtn = document.createElement("button");
  weeklyBtn.textContent = "Weekly";
  weeklyBtn.onclick = () => fetchReport("weekly");

  const monthlyBtn = document.createElement("button");
  monthlyBtn.textContent = "Monthly";
  monthlyBtn.onclick = () => fetchReport("monthly");

  document.body.appendChild(dailyBtn);
  document.body.appendChild(weeklyBtn);
  document.body.appendChild(monthlyBtn);

  //  DOWNLOAD BUTTON
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download Expenses ⬇️";
  downloadBtn.onclick = downloadReport;

  document.body.appendChild(downloadBtn);
}
  }

async function showLeaderboard(){

 const token = localStorage.getItem("token");

 const res = await axios.get(
 "http://localhost:3000/purchase/premium/showLeaderboard",
 { headers:{Authorization:`Bearer ${token}`} }
 );
 
 const ul = document.createElement("ul");
 
 res.data.forEach(user=>{
  
  const li = document.createElement("li");

  li.textContent =
  `Name - ${user.name} Total Expense - ${user.totalExpense}`;

  ul.appendChild(li);

 });

 document.body.appendChild(ul);

}

async function fetchReport(type) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:3000/expenses/report?filter=${type}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    table.innerHTML = "";

    if (!res.data.length) {
      table.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
      return;
    }

    res.data.forEach(expense => showExpense(expense));
  
  } catch (err) {
    console.log(err);
    alert("Only premium users can access this");
  }
}

async function downloadReport() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:3000/expenses/download",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const a = document.createElement("a");
    a.href = res.data.fileURL;
    a.download = "expenses.csv";
    a.click();

  } catch (err) {
    console.log(err);
    alert("Download failed");
  }
}


async function getExpenses(page = 1, limit = 10) {

  try {

    const res = await axios.get(
      `http://localhost:3000/expenses/get?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    table.innerHTML = "";

    res.data.expenses.forEach(expense => {
      showExpense(expense);
    });

    showPagination(res.data, limit);
console.log("Pagination Data:", res.data);
  } catch (err) {

    console.log(err);

    localStorage.removeItem("token");

    window.location.href = "login.html";

  }

}

function showPagination(data, limit) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (data.hasPreviousPage) {
    const prev = document.createElement("button");
    prev.innerText = "Prev";
    prev.onclick = () => getExpenses(data.previousPage, limit);
    pagination.appendChild(prev);
  }

  const current = document.createElement("button");
  current.innerText = data.currentPage;
  current.disabled = true;
  pagination.appendChild(current);

  if (data.hasNextPage) {
    const next = document.createElement("button");
    next.innerText = "Next";
    next.onclick = () => getExpenses(data.nextPage, limit);
    pagination.appendChild(next);
  }

  const last = document.createElement("button");
  last.innerText = "Last";
  last.onclick = () => getExpenses(data.lastPage, limit);
  pagination.appendChild(last);
}

const limitDropdown = document.getElementById("limit");

// Load saved value
window.onload = () => {
  const savedLimit = localStorage.getItem("limit") || 10;
  limitDropdown.value = savedLimit;

  getExpenses(1, savedLimit);
};

// When user changes
limitDropdown.addEventListener("change", () => {
  localStorage.setItem("limit", limitDropdown.value);
  getExpenses(1, limitDropdown.value);
});




