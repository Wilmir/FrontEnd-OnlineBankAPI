/*Delegation function*/
accountWidget.addEventListener("click", async function(event){
    if(event.target.className == "remove"){
        if(window.confirm("Are you sure you want to remove this account?")){
            const url = `http://localhost:8080/onlinebanking/webapi/customers`;
            const customerNumber = document.getElementById("customerKey").textContent;
            const accountNumber = event.target.parentNode.parentNode.querySelector(".accountKey").textContent;
            const endpoint = `${url}/${customerNumber}/accounts/${accountNumber}`;
        
            console.log(`Trying to DELETE account ${endpoint}`);
                    
            const accountJSON = await removeAccount(endpoint);
                     

            setTimeout(function(){
                const notice = event.target.parentNode.parentNode.querySelector(".account-type");
                notice.innerHTML = `This account has been closed`;
                accountCounter.innerHTML = `Updating accounts...`
                notice.style.color = "gray";
            }, 0);
        
            setTimeout(function(){
                getAccounts(`${url}/${customerNumber}/accounts`);
            }, 1000);
        }
    } else if (event.target.className == "view"){
        const url = `http://localhost:8080/onlinebanking/webapi/customers`;
        const customerNumber = document.getElementById("customerKey").textContent;
        const accountNumber = event.target.parentNode.parentNode.querySelector(".accountKey").textContent;
        const endpoint = `${url}/${customerNumber}/accounts/${accountNumber}`;
        console.log(`Trying to GET account ${endpoint}`);

        const accountJSON = await getAccount(endpoint);

        renderSingleAccount(accountJSON);

    }
});

async function removeAccount(endpoint){
    try{
    const response = await fetch(endpoint, {
                                            method: 'DELETE' // *GET, POST, PUT, DELETE, etc.
                                            });
    if(response.ok){
        console.log(`Deletion is successful: Status: ${response.status}`)
        const jsonResponse = await response.json();
        console.log(jsonResponse); 
        return jsonResponse;      
        } 
    }catch(error){
        console.log("Deletion failed")
    }
}
        

async function getAccount(endpoint){
    try{
    const response = await fetch(endpoint);
    if(response.ok){
        console.log(`Single Account retrieval is successful: Status: ${response.status}`)
        const jsonResponse = await response.json();
        console.log(jsonResponse);    
        return jsonResponse;    
        } 
    }catch(error){
        console.log("Single Account Retrieval failed")
    }
}