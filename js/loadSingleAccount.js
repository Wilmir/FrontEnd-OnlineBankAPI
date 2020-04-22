const accountHeader = document.querySelector(".transactions-header");
const transactionsCounter = document.querySelector(".transactions-counter");
const transactionsDetails = document.querySelector(".transactions-details");


async function renderSingleAccount(accountJSON){

    /*Add Transaction Buttons*/
    const transactionButtons = `<div class = "transaction-buttons">
                                <button class = "lodge">Lodge</button>
                                <button class = "withdraw">Withdraw</button>
                                <button class = "transfer">Transfer</button>
                            </div>`;

    const div = document.createElement('div');
    div.innerHTML = transactionButtons;

    accountHeader.appendChild(div);

    /*Render Transactions*/
    console.log(`Trying to render account ${accountJSON.accountNumber} to transactions section`);

    const transactionsJSON = await getTransactions(`${accountJSON.links[2].link}`);

    transactionsCounter.innerHTML = `Your ${accountJSON.currentAccount ? "Current Account's": "Savings Account's"} balance is  ${accountJSON.currentBalance.toLocaleString('en-GB', {style:'currency', currency:'EUR'})}`;

    renderTransactions(transactionsJSON);


    /*Display Modal When One of the Buttons is Clicked*/
    const lodgeBtn = document.querySelector(".lodge");
    lodgeBtn.addEventListener("click", displayLodgeModal);


    function displayLodgeModal(){
        const container = document.createElement('div');
        container.setAttribute("class","lodgeModal");
        container.innerHTML = lodgementForm;
        document.body.appendChild(container);

        document.querySelector(".lodgeModal").style.display = "block";

        container.addEventListener("click", removeLodgeModal);
    }


    function removeLodgeModal(event){
        const lodgeModal = document.querySelector(".lodgeModal");
        if(event.target === lodgeModal){
            lodgeModal.remove();
        }
    }



}



const lodgementForm = `<div class = "lodge-form">
                        <div class = "transactionModal">
                        <form method="POST" id = "lodge">
                        <input type = text name="amount" id="lodge-amount" placeholder="Amount" required><br>
                        <div class = "submit-btn">
                            <input type="submit" id = "submit" value="Lodge">
                         </div>
                        </form>
                        </div>
                        </div>`;

const withdrawalForm = `<div class = "withdrawal-form">
                        <div class = "transactionModal">
                        <form method="POST" id = "withdraw">
                        <input type = text name="name" id="withdraw-amount" placeholder="Amount" required><br>
                        <div class = "submit-btn">
                            <input type="submit" id = "submit" value="Withdraw">
                        </div>
                        </form>
                        </div>
                        </div>`;

const transferForm = `<div class = "withdrawal-form">
                        <div class = "transactionModal">
                        <form method="POST" id = "withdraw">
                        <input type = text name="recipient" id="recipient" placeholder="Recipient Account Number" required><br>
                        <input type = text name="name" id="withdraw-amount" placeholder="Enter Amount" required><br>
                        <div class = "submit-btn">
                            <input type="submit" id = "submit" value="Withdraw">
                        </div>
                        </form>
                        </div>
                        </div>`;




function renderTransactions(transactionsJSON){
    const transactions = transactionsJSON;

    transactionsDetails.innerHTML = ``;
    const divHeader = document.createElement('div');
    divHeader.setAttribute("class","transaction-header");
    divHeader.innerHTML = `<div class = "transaction-date">Date</div>
                    <div class = "transaction-description">Details</div> 
                    <div class = "transaction-debit">Debit</div> 
                    <div class = "transaction-credit">Credit</div> 
                    <div class = "transaction-balance">Balance</div>`;
    transactionsDetails.appendChild(divHeader);

    let i;
    let transaction;
    for(i = transactions.length-1; i>=0; i--){
        transaction = transactions[i];
        console.log(transactions[i]);

        const divData = document.createElement('div');
        divData.setAttribute("class","transaction-row");
        divData.innerHTML = `<div class = "transaction-date">${transaction.createdDate.toLocaleString()}</div>
                        <div class = "transaction-description">${transaction.description}</div> 
                        <div class = "transaction-debit">${transaction.debit ? transaction.transactionAmount.toFixed(2) : ""}</div> 
                        <div class = "transaction-credit">${transaction.credit ? transaction.transactionAmount.toFixed(2) : ""}</div> 
                        <div class = "transaction-balance">Balance</div>`;
    
        transactionsDetails.appendChild(divData);

    }   
}

async function getTransactions(endpoint){
    try{
    const response = await fetch(endpoint);
    if(response.ok){
        console.log(`Transactions retrieval is successful: Status: ${response.status}`)
        const jsonResponse = await response.json();
        console.log(jsonResponse);    
        return jsonResponse;    
        } 
    }catch(error){
        console.log("Transaction retrieval failed")
    }
}





