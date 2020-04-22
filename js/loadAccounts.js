const accountWidget = document.querySelector(".accounts-section")
const accountCounter = document.querySelector(".accounts-counter");
//Renders all the accounts of the customer
function renderAccounts(accountsJSON){
    accountWidget.innerHTML = ``;
    accountCounter.innerHTML = `You have ${accountsJSON.length} account${accountsJSON.length > 1? "s." : "."}`;
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
                                    <div class = "currentBalance">Current Balance</div>
                                </div>
                                <div class = "account-card-column"> 
                                    <div class = "account-data accountNumber accountKey" id="accountKey">${account.accountNumber}</div>
                                    <div class = "account-data sortCode">${account.sortCode}</div>
                                    <div class = "account-data currentBalance">${account.currentBalance}</div>
                                </div>
                             </div>
                             <div class = "account-buttons">
                                <button class = "remove" alt = "remove">Close</button>
                                <button class = "view" alt = "view">View</button>
                             </div>`;
            accountWidget.appendChild(div);

        });
}

