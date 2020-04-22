const newAccountFormContainer = document.querySelector(".new-account-form");

const addNewAccountBtn = document.querySelector(".new-account-button");

addNewAccountBtn.addEventListener("click", addNewAccount);

function addNewAccount(){
        addNewAccountBtn.style.display = "none";
        const newAccountForm = document.createElement('div');
        newAccountForm.innerHTML =`    <span class="closeNewAccount">&times;</span>
                                                <div class = "title">Open New Account</div>
                                                <form method="POST" id = "createAccount">
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
                                                <input type = "text" name="initialBalance" id="initialBalance" placeholder = "Opening Balance" required><br>
                                                <div class = "submit-btn">
                                                <input type="submit" id = "createAccountBtn" value="Submit">
                                                </div>
                                            </form>`;
        
        newAccountFormContainer.appendChild(newAccountForm);

        const closeNewAccountBtn = newAccountForm.querySelector(".closeNewAccount");

        closeNewAccountBtn.addEventListener("click", function(){
            addNewAccountBtn.style.display = "block";
            newAccountForm.remove();
        })

        const createAccountForm = document.querySelector("#createAccount");
        const customerID = document.querySelector("#customerKey");
        const initialBalance = createAccountForm.querySelector("#initialBalance");
        const savings = createAccountForm.querySelector("#savings");
        const current = createAccountForm.querySelector("#current");
                
        createAccountForm.addEventListener("submit", event => {
            event.preventDefault();

            const data = {
                "currentBalance" : initialBalance.value,
                "savingsAccount" : savings.checked,
                "currentAccount" : current.checked,
            }

            addAccount(customerID.textContent, data);

            addNewAccountBtn.style.display = "block";
            newAccountForm.remove();

        });
}

    
async function addAccount(customerID, data){
    const url = `http://localhost:8080/onlinebanking/webapi/customers`;

    const endpoint = `${url}/${customerID}/accounts`;

    const body = JSON.stringify(data)

    try{
        const response = await fetch(endpoint, {
                                        method: 'POST',
                                        headers:
                                                {
                                                "Accept": "application/json",
                                                "Content-Type": "application/json"  
                                                },
                                        body: body
                                        });
        if(response.ok){
            const jsonResponse = await response.json();
            console.log("New account has been added.")
            console.log(jsonResponse);
            getAccounts(`${jsonResponse.links[1].link}/accounts`);
            setTimeout(highlightNewAccount, 100);

        }else{
            throw new Error("Request failed");
        }
        
    }catch(error){
        console.log("Creation of the new account failed.");
    }

}


const highlightNewAccount = function(){
    document.querySelector(".account-card:last-child").style.boxShadow = "2px 2px 12px #c4dbe7";
    setTimeout(function(){
        document.querySelector(".account-card:last-child").style.boxShadow = "2px 2px 8px #e5e5e5";
    }, 4000);
    return;
}