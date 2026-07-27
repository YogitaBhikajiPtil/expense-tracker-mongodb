const form = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    messageDiv.innerText = "All fields are required";
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      email,
      password
    });

    messageDiv.style.color = "green";
    messageDiv.innerText = res.data.message;

    // Example if you later send token
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    localStorage.setItem("isLoggedIn", "true");
    // Redirect after login (optional)
    // window.location.href = "dashboard.html";
    window.location.href = "expense.html";


  } catch (error) {
    messageDiv.style.color = "red";
    messageDiv.innerText =
      error.response?.data?.message || "Login failed";
  }
});

// Redirect to signup page
function goToSignup() {
  window.location.href = "index.html";
}

document.getElementById("forgotPasswordBtn").onclick = () => {
  document.getElementById("forgotForm").style.display = "block";
};

document.getElementById("submitForgot").onclick = async () => {
  const email = document.getElementById("email").value;

  try {
    const response = await axios.post("http://localhost:3000/password/forgotpassword", {
      email: email
    });

    alert(response.data.message);
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


