const form = document.getElementById("signupForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent page reload
 
   console.log("Signup clicked");

  try {  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    // Axios POST request
    const response = await axios.post("http://0/auth/signup", {
      name, 
      email,
      password 
    });

    alert(response.data.message);

    // Clear form
    form.reset();

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message || "Signup Failed");
    } else {
      alert("Server not responding");
    }
  }
});

// function displayExpense(expense) {
//   const li = document.createElement("li");

//   li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete";

//   deleteBtn.onclick = async () => {
//     await fetch(`http://0/expenses/delete/${expense.id}`, {
//       method: "DELETE"
//     });

//     li.remove(); // remove from UI
//   };

//   li.appendChild(deleteBtn);
//   document.getElementById("expenseList").appendChild(li);
// }





