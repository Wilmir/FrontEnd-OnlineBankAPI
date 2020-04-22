/*Delegation function*/
accountWidget.addEventListener("click", function(event){
    if(event.target.className == "remove"){
        if(window.confirm("Are you sure you want to remove this account?")){
            const url = `http://localhost:8080/onlinebanking/webapi/customers`;
            const customerNumber = document.getElementById("customerKey").textContent;
            const accountNumber = event.target.parentNode.parentNode.querySelector(".accountKey").textContent;
            const endpoint = `${url}/${customerNumber}/accounts/${accountNumber}`;
        
            console.log(`Trying to delete account ${endpoint}`);
                    
            removeAccount(endpoint);
                       
            setTimeout(function(){
                const notice = event.target.parentNode.parentNode.querySelector(".account-type");
                notice.innerHTML = `This account has been closed`;
                notice.style.color = "red";
            }, 100);
        
            setTimeout(function(){
                getAccounts(`${url}/${customerNumber}/accounts`);
            }, 3000);
        }
    } else if (event.target.className == "view"){
        const accountNumber = event.target.parentNode.parentNode.querySelector(".accountKey").textContent;
        console.log(`Trying to view account ${accountNumber}`);
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
        } 
    }catch(error){
        console.log("why oh why?")
    }
}
        