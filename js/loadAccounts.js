const accountWidget = document.querySelector(".accounts-section")

//Renders all the accounts of the customer
function renderAccounts(accountsJSON){
    accountWidget.innerHTML = ``;

    accountsJSON.forEach(account => 
        {
            const div = document.createElement('div');

            const cardTitle = account.currentAccount ? "Current Account": "Savings Account";

            div.setAttribute("class","account-card");
            div.innerHTML = `<div class = "account-type">${cardTitle}</div>
                             <div class = "account-details">
                                <div class = "account-card-column">
                                    <div class = "accountNumber">Account Number</div>
                                    <div class = "sortCode">Sort Code</div>
                                </div>
                                <div class = "account-card-column"> 
                                    <div class = "account-data accountNumber accountKey" id="accountKey">${account.accountNumber}</div>
                                    <div class = "account-data sortCode">${account.sortCode}</div>
                                </div>
                             </div>
                             <div class = "account-buttons">
                                <button class = "remove" alt = "remove">Close</button>
                                <button class = "view" alt = "view">View</button>
                             </div>`;
            accountWidget.appendChild(div);

        });
}

