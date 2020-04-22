/*Delegation function*/
accountWidget.addEventListener("click", function(event){
    if(event.target.className == "remove"){
            const url = `http://localhost:8080/onlinebanking/webapi/customers`;
            const customerNumber = document.getElementById("customerKey").textContent;
            const accountNumber = event.target.parentNode.parentNode.querySelector(".accountKey").textContent;
            const endpoint = `${url}/${customerNumber}/accounts/${accountNumber}`;
        
            console.log(`Trying to delete account ${endpoint}`);
            
            /*
            removeAccount(endpoint);
                       
            setTimeout(function(){
                const statusNotice = event.target.parentNode.parentNode.querySelector(".account-type");
                statusNotice.innerHTML = `This account has been closed`;
                accountCounter.innerHTML = `Retrieving your accounts...`
                statusNotice.style.color = "gray";
            }, 100);
        
            setTimeout(function(){
                getAccounts(`${url}/${customerNumber}/accounts`);
            }, 3000);
            */
    } else if (event.target.className == "view"){
        const url = `http://localhost:8080/onlinebanking/webapi/customers`;
        const customerNumber = document.getElementById("customerKey").textContent;
        const accountNumber = event.target.parentNode.parentNode.querySelector(".accountKey").textContent;
        const endpoint = `${url}/${customerNumber}/accounts/${accountNumber}`;

        console.log(`Trying to view account ${endpoint}`);

        viewAccount(endpoint);
    }
});

async function removeAccount(endpoint){
    try{
    const response = await fetch(endpoint, {
                                            method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
                                            });
    if(response.ok){
        const jsonResponse = await response.json();
        console.log(`Deletion is successful: Status: ${response.status}`)
        console.log(jsonResponse);  
        } 
    }catch(error){
        console.log("Failed to delete the account.")
    }
}
        

async function viewAccount(endpoint){
    try{
        const response = await fetch(endpoint);
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(`Account retrieval: Status: ${response.status}`)
            console.log(jsonResponse);   
            return jsonResponse;     
            } 
        }catch(error){
            console.log("Failed to get the account")
        }
}