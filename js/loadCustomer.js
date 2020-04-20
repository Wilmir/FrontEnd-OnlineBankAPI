const customerWidget = document.querySelector(".customer-header");
const accountWidget = document.querySelector(".accounts-section")

function renderCustomer(jsonResponse){
    const div = document.createElement('div');
    customerWidget.innerHTML = ``;
    div.setAttribute("class","customer-details");
    div.innerHTML = `<div class = "customer-greeting title">Hi ${(jsonResponse.name[0]).toUpperCase() + jsonResponse.name.slice(1)}! Welcome to your Online Banking Profile</div>
                    <div class = "customer-table"> 
                        <div class = "customer-column">
                            <div class = "customer-title">Customer ID</div>
                            <div class = "customer-data customerID">${jsonResponse.customerId}</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-title">Name</div>
                            <div class = "customer-data name">${jsonResponse.name}</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-title">Email</div>
                            <div class = "customer-data email">${jsonResponse.email}</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-title">Address</div>
                            <div class = "customer-data address">${jsonResponse.address}</div>
                        </div>
                     </div>`;

    customerWidget.appendChild(div);

    getAccounts(jsonResponse.customerId);
}


async function getAccounts(customerId){
    const url = `http://localhost:8080/onlinebanking/webapi/customers`;

    const endpoint = `${url}/${customerId}/accounts`

    try{
        console.log("Starting to retrieve accounts.");
        const response = await fetch(endpoint);
        console.log("Response " + response);

        if(response.ok){
            const jsonResponse = await response.json();
            console.log(`JSON Response: ${jsonResponse}`);
            console.log("Retrieval of accounts successful");
            renderAccounts(jsonResponse);

        }else{
            throw new Error("Request failed!");
        }
    }catch(error){
        console.log("Account not found");
    }
}


function renderAccounts(accounts){
    accountWidget.innerHTML = ``;
    accounts.forEach(account => 
        {
            console.log(account)
            const div = document.createElement('div');
            div.setAttribute("class","account-card");
            div.innerHTML = `<div class = "account-card-column">
                                <div class = "accountNumber">Account Number</div>
                                <div class = "sortCode">Sort Code</div>
                                <div class = "savingsAccount">Savings Account</div>
                                <div class = "currentAccount">Current Account</div>
                                <div class = "currentBalance">Current Balance</div>
                             </div>
                             <div class = "account-card-column"> 
                                <div class = "accountNumber">${account.accountNumber}</div>
                                <div class = "sortCode">${account.sortCode}</div>
                                <div class = "savingsAccount">${account.savingsAccount}</div>
                                <div class = "currentAccount">${account.currentAccount}</div>
                                <div class = "currentBalance">${account.currentBalance}</div>
                             </div>`;
            accountWidget.appendChild(div);
        });

    const div = document.createElement('div');
    div.setAttribute("class","account-card");
    div.innerHTML = `<div class = "account-card-column">
                        Open a new account
                    </div>`;
    accountWidget.appendChild(div);

    
}