document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.getElementById('balance');
    const typeElement = document.getElementById('type');
    const descriptionElement = document.getElementById('description');
    const amountElement = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const addTransactionButton = document.getElementById('add-transaction');

    let balance = 0;

    addTransactionButton.addEventListener('click', function () {
        const type = typeElement.value;
        const description = descriptionElement.value;
        const amount = parseFloat(amountElement.value);

        if (!description || isNaN(amount)) {
            alert('Please enter a valid description and amount.');
            return;
        }

        const transaction = document.createElement('li');
        transaction.innerHTML = `
            ${description} ($${amount})
            <span class="delete" onclick="removeTransaction(this)">Delete</span>
        `;

        if (type === 'expense') {
            balance -= amount;
            transaction.style.color = 'red';
        } else {
            balance += amount;
            transaction.style.color = 'green';
        }

        balanceElement.textContent = balance.toFixed(2);

        transactionList.appendChild(transaction);

        descriptionElement.value = '';
        amountElement.value = '';
    });

    window.removeTransaction = function (element) {
        const transaction = element.parentElement;
        const transactionText = transaction.textContent;
        const amount = parseFloat(transactionText.match(/\$([\d.]+)/)[1]);

        if (transactionText.includes('income')) {
            balance -= amount;
        } else {
            balance += amount;
        }

        balanceElement.textContent = balance.toFixed(2);

        transactionList.removeChild(transaction);
    };
});
