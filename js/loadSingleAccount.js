const accountHeader = document.querySelector(".transactions-header");
const transactionsCounter = document.querySelector(".transactions-counter");
const transactionsDetails = document.querySelector(".transactions-details");

async function renderSingleAccount(accountJSON){

    console.log(`Trying to render account ${accountJSON.accountNumber} to transactions section`);

    const transactionsJSON = await getTransactions(`${accountJSON.links[2].link}`);

    transactionsCounter.innerHTML = `Your ${accountJSON.currentAccount ? "Current Account's": "Savings Account's"} balance is  ${accountJSON.currentBalance}`;

    renderTransactions(transactionsJSON);

}

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
                        <div class = "transaction-debit">${transaction.debit ? transaction.transactionAmount : ""}</div> 
                        <div class = "transaction-credit">${transaction.credit ? transaction.transactionAmount : ""}</div> 
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





