
async function displayTransactionModal(formType, accountJSON){

/*Generic Form for All Transactions*/
const transactionForm = `<div class = "transaction-form">
    <div class = "transactionModal">
    <span class="closeTransaction">&times;</span>
    <div class = "title">${formType.charAt(0).toUpperCase()}${formType.slice(1)} Form</div>
    <form method="POST" id = "${formType}"> 
    ${formType === 'transfer' ? "<input type = text name='recipient' id='recipientAccount' placeholder='Recipient Account Number' required><br>" : ""}
    <input type = text name="amount" id="transaction-amount" placeholder="Amount" required><br>
    <div class = "submit-btn">
        <input type="submit" id = "submit" value="Confirm">
     </div>
    </form>
    </div>
    </div>`;

    /*Construct the MODAL*/
    const container = document.createElement('div');
    container.setAttribute("class","transactionModalContainer");

    container.innerHTML = transactionForm;

    document.body.appendChild(container);

    document.querySelector(".transactionModalContainer").style.display = "block";

    const modalForm = document.getElementById(formType);

    /*Call Transaction HTTP Request*/
    modalForm.addEventListener("submit", async event => {
        event.preventDefault();

        const amountField = document.getElementById("transaction-amount");
        console.log(`Trying to ${formType} ${amountField.value}`);
        let endpoint = `${accountJSON.links[2].link}/${formType}?amount=${amountField.value}`;

        if(formType == 'transfer'){
            const recipientAccount = document.getElementById("recipientAccount")
            console.log(`Transfering to ${recipientAccount}`);
            endpoint = `${endpoint}&recipient=${recipientAccount.value}`;
        }

        const newAccountBalance = await performTransaction(endpoint);

        setTimeout(function(){
            console.log(`${formType} successful`);
            container.remove();
            transactionsCounter.innerHTML =`Updating transaction details...`
        },1000);

        setTimeout(function(){
            renderSingleAccount(accountJSON);
        },3000);

        setTimeout(function(){
            transactionsCounter.innerHTML = `Your ${accountJSON.currentAccount ? "Current Account's": "Savings Account's"} balance is  ${newAccountBalance.toLocaleString('en-GB', {style:'currency', currency:'EUR'})}`;
        },4100);


    })

    /*Remove Modal Listeners*/
    container.addEventListener("click", function(event){
        const formContainer = document.querySelector(".transaction-form")
        if(event.target === container || event.target === formContainer){
            container.remove();
        }
    });

    const closeBtn = document.querySelector(".closeTransaction");

    closeBtn.addEventListener("click", function(){
        container.remove();
    })
}


/*Lodge, Withdraw and Transfer HTTP Request*/
async function performTransaction(endpoint){
    try{
        const response = await fetch(endpoint);
        console.log(`HTTP request status ${response.status}`);

        if(response.ok){
            const jsonResponse = await response.json();
            console.log(`New Balance Received is ${jsonResponse}`);
            return jsonResponse;
        }
    }catch(error){
        console.log("Transaction failed.");
    }
}


