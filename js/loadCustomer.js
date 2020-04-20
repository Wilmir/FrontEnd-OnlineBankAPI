const customerWidget = document.querySelector(".customer-header");
const accountWidget = document.querySelector(".accounts-section")


//Renders customer details
function renderCustomer(jsonResponse){
    const div = document.createElement('div');
    customerWidget.innerHTML = ``;
    div.setAttribute("class","customer-details");
    div.innerHTML = `<div class = "customer-greeting title">Hi ${(jsonResponse.name[0]).toUpperCase() + jsonResponse.name.slice(1)}! Welcome to your Online Banking Profile</div>
                    <div class = "customer-table"> 
                        <div class = "customer-column">
                            <div class = "customer-title">Customer ID</div>
                            <div class = "customer-data customerID" id="customerKey">${jsonResponse.customerId}</div>
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

//Retrieves all the accounts of the customer
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

//Renders all the accounts of the customer
function renderAccounts(accounts){
    accountWidget.innerHTML = ``;
    accounts.forEach(account => 
        {
            console.log(account)
            const div = document.createElement('div');

            const cardTitle = account.currentAccount ? "Current Account": "Savings Account";

            div.setAttribute("class","account-card");
            div.innerHTML = `<div class = "account-type">${cardTitle}</div>
                             <div class = "account-details">
                                <div class = "account-card-column">
                                    <div class = "account-data accountNumber">Account Number</div>
                                    <div class = "sortCode">Sort Code</div>
                                </div>
                                <div class = "account-card-column"> 
                                    <div class = "account-data accountNumber">${account.accountNumber}</div>
                                    <div class = "account-data sortCode">${account.sortCode}</div>
                                </div>
                             </div>
                             <div class = "transaction-buttons">
                             </div>`;
            accountWidget.appendChild(div);
        });

    const newAccountCard = document.createElement('div');
    newAccountCard.setAttribute("class","account-card");
    newAccountCard.innerHTML = `<div class = "account-card-column">
                        <button class = "new-account-button">Open A New Account</button>
                    </div>`;

    accountWidget.appendChild(newAccountCard);


    //Adds new account of the customer
    const addNewAccountBtn = document.querySelector(".new-account-button");
    addNewAccountBtn.addEventListener("click", () => {
        addNewAccountBtn.style.display = "none";
        const newAccountFormContainer = document.createElement('div');
        newAccountFormContainer.innerHTML =`<div class = "title">Open New Account</div>
                                                <form method="POST" id = "createAccount">
                                                <input type = "text" name="sortCode" id="sortCode" placeholder = "Sort Code" required><br>
                                                <div class = "radio-btn">
                                                    <div>
                                                        <input type = "radio" name="type" id="savings" value = "savings" required>
                                                        <label for="savings">Savings</label>
                                                    </div>
                                                    <div>
                                                        <input type = "radio" name="type" id="current" value = "current" required>
                                                        <label for="savings">Current</label>
                                                    </div>
                                                </div>
                                                <div class = "submit-btn">
                                                <input type="submit" id = "createAccountBtn" value="Submit">
                                                </div>
                                            </form>`;
        newAccountCard.appendChild(newAccountFormContainer);


        const createAccountForm = document.querySelector("#createAccount");
        const customerID = document.querySelector("#customerKey");
        const sortCode = createAccountForm.querySelector("#sortCode");
        const savings = createAccountForm.querySelector("#savings");
        const current = createAccountForm.querySelector("#current");
        const createAccountBtn = createAccountForm .querySelector("#createAccountBtn");
        
        //Renders new account of the customer
        
        
        
        createAccountForm.addEventListener("submit", event => {
            event.preventDefault();


            addNewAccount();

        });

        
        async function addNewAccount(){
            const url = 'http://localhost:8080/onlinebanking/webapi/customers';
            const custID = customerID.textContent;

            const endpoint = `${url}/${custID}/accounts`;

            const data = {
                "sortCode" : sortCode.value,
                "savingsAccount" : savings.checked,
                "currentAccount" : current.checked,
            }

            try{
                const response = await fetch(endpoint, {
                                                method: 'POST',
                                                headers:
                                                        {
                                                        "Accept": "application/json",
                                                        "Content-Type": "application/json"  
                                                        },
                                                body: JSON.stringify(data)
                                                });
                if(response.ok){
                    const jsonResponse = await response.json();
                    console.log("New account has been added.")
                    console.log(jsonResponse);
                    getAccounts(custID);




                }else{
                    throw new Error("Request failed");
                }
                
            }catch(error){
                console.log("Creation of the new account failed.");
            }

        }
        





    });
}
