const customerWidget = document.querySelector(".customer-container");

function renderCustomer(jsonResponse){
    const div = document.createElement('div');
    customerWidget.innerHTML = ``;
    div.setAttribute("class","customer-details")
    div.innerHTML = `<div class = "customer-greeting title">Hi ${(jsonResponse.name[0]).toUpperCase() + jsonResponse.name.slice(1)}! Welcome to your Online Banking Profile</div>
                    <div class = "customer-table"> 
                        <div class = "customer-column">
                            <div class = "customer-title">Customer ID</div>
                            <div class = "customer-body customerID">${jsonResponse.customerId}</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-title">Name</div>
                            <div class = "customer-body name">${jsonResponse.name}</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-title">Email</div>
                            <div class = "customer-body email">${jsonResponse.email}</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-title">Address</div>
                            <div class = "customer-body address">${jsonResponse.address}</div>
                        </div>
                     </div>`;

    customerWidget.appendChild(div);

    renderAccounts(jsonResponse.customerId);
}



async function renderAccounts(customerId){
    const accounts = await getAccounts(customerId);
    console.log(accounts);


}


async function getAccounts(customerId){
    const url = `http://localhost:8080/onlinebanking/webapi/customers`;

    const endpoint = `${url}/${customerId}/accounts`

    try{
        console.log("Starting to retrieve accounts.");
        const response = await fetch(endpoint);

        if(response.ok){
            const jsonResponse = await response.json();
            console.log("Retrieval of accounts successful");
            return jsonResponse;
        }else{
            throw new Error("Request failed!");
        }
    } catch(error){
        console.log(error);
    }
}