const backendUrl = 'http://localhost:8089/api/expenses';

const expenseTypeInput = document.getElementById("expenseType");
const expenseAmountInput = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalExpenseEl = document.getElementById("totalExpense");

let totalExpense = 0;

async function fetchExpenses() {
    const response = await fetch(backendUrl);
    const expenses = await response.json();
    renderExpenses(expenses);
}

async function addExpense() {
    const type = expenseTypeInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (type === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const newExpense = { type, amount };

    await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
    });

    fetchExpenses();

    expenseTypeInput.value = '';
    expenseAmountInput.value = '';
}

function renderExpenses(expenses) {
    expenseList.innerHTML = '';
    totalExpense = 0;

    expenses.forEach(expense => {
        totalExpense += expense.amount;

        const li = document.createElement("li");
        li.textContent = `${expense.type} - $${expense.amount}`;
        expenseList.appendChild(li);
    });

    totalExpenseEl.textContent = totalExpense.toFixed(2);
}

addExpenseBtn.addEventListener("click", addExpense);

fetchExpenses();
