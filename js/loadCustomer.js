const main = document.querySelector(".main");
const container = document.querySelector(".container");
const customerWidget = document.querySelector(".customer-header");
const customerName = document.querySelector(".customer-name-bar");

//Renders customer details
function renderCustomer(customerJSON){
    main.style.background = "white";
    notice.style.display = "none";
    container.style.display = "block";

    const userName = (customerJSON.name[0]).toUpperCase() + customerJSON.name.slice(1);
    transactionsCounter.innerHTML = ``;
    transactionsCounter.innerHTML = `<div>Hi ${userName}! Welcome to Your Online Banking Profile.</div>`;


    customerName.innerHTML = `<div>${userName}</div><div> | </div><div> <a href = "index.html">Sign Out</a></div>`;
    customerWidget.innerHTML = ``;

    const div = document.createElement('div');
    div.setAttribute("class","customer-details");
    div.innerHTML = `   <div class = "customer-table"> 
                            <div class = "customer-row">
                                <div class = "customer-inner-row">
                                    <div>
                                        <div class = "customer-title">Name</div>
                                        <div class = "customer-data name">${(customerJSON.name[0]).toUpperCase() + customerJSON.name.slice(1)}</div>
                                    </div>
                                    <div>
                                        <div class = "customer-title">ID</div>
                                        <div class = "customer-data customerID" id="customerKey">${customerJSON.customerId}</div>
                                    </div>
                                </div>
                            </div>
                            <div class = "customer-row">
                                <div class = "customer-title">Email</div>
                                <div class = "customer-data email">${customerJSON.email}</div>
                            </div>
                            <div class = "customer-row">
                                <div class = "customer-title">Address</div>
                                <div class = "customer-data address">${customerJSON.address}</div>
                            </div>
                        </div>`;

    customerWidget.appendChild(div);
}


