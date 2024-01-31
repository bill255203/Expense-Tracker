let currentUser = null;

async function registerUser() {
  const userName = document.getElementById("userName").value.trim();
  if (userName) {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${encodeURIComponent(userName)}`,
      });
      if (response.ok) {
        currentUser = userName;
        showExpenseForm(); // Show the expense form now
        await updateBalances();
        await fetchAndDisplayExpenses(); // Fetch and display all expenses
      } else {
        console.error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
    }
  }
}
async function fetchAndDisplayExpenses() {
  const response = await fetch("http://localhost:5000/expenses");
  const expenses = await response.json();

  // Assuming you have a div with the id 'allExpenses' for displaying the expenses
  const allExpensesDiv = document.getElementById("allExpenses");
  allExpensesDiv.innerHTML = "<h3>All Expenses:</h3>";

  expenses.forEach((expense) => {
    allExpensesDiv.innerHTML += `<p>${expense.paid_by} paid ${expense.amount} for ${expense.owed_by}</p>`;
  });
}
async function addExpense() {
  const amount = parseFloat(document.getElementById("amount").value);
  const owedBy = document.getElementById("owedBy").value;
  if (amount > 0 && owedBy && currentUser !== owedBy) {
    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `paid_by=${encodeURIComponent(
        currentUser
      )}&owed_by=${encodeURIComponent(owedBy)}&amount=${amount}`,
    });
    await updateBalances();
  }
}

async function updateBalances() {
  const response = await fetch("http://localhost:5000/expenses");
  const expenses = await response.json();
  const balances = {};

  // Calculate who owes whom how much
  expenses.forEach((expense) => {
    if (expense.paid_by === currentUser) {
      balances[expense.owed_by] =
        (balances[expense.owed_by] || 0) + expense.amount;
    } else if (expense.owed_by === currentUser) {
      balances[expense.paid_by] =
        (balances[expense.paid_by] || 0) - expense.amount;
    }
  });

  // Create a list of balances to display
  const balancesDiv = document.getElementById("balances");
  balancesDiv.innerHTML = `<h3>Amounts Owed:</h3>`;
  Object.keys(balances).forEach((user) => {
    const amountOwed = balances[user].toFixed(2);
    balancesDiv.innerHTML += `<p>${user} owes ${currentUser}: $${amountOwed}</p>`;
  });
}
// This function should be called after the user successfully logs in or registers
async function updateOwedByOptions() {
  // Fetch the list of users from the backend
  const response = await fetch("http://localhost:5000/users");
  const users = await response.json();

  // Assuming 'currentUser' is the name of the user who is currently logged in
  const select = document.getElementById("owedBy");
  select.innerHTML = users
    .filter((user) => user.name !== currentUser) // Filter out the current user
    .map((user) => `<option value="${user.name}">${user.name}</option>`)
    .join("");
}

// Call this function to show the expense form and populate the dropdown
function showExpenseForm() {
  document.getElementById("expenseForm").style.display = "block";
  updateOwedByOptions(); // Make sure to call this function to populate the dropdown
}
