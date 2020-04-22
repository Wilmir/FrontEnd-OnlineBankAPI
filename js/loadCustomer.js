const main = document.querySelector(".main");
const container = document.querySelector(".container");
const customerWidget = document.querySelector(".customer-header");
const customerGreeting = document.querySelector(".customer-greeting");

//Renders customer details
function renderCustomer(customerJSON){
    main.style.background = "white";
    notice.style.display = "none";
    container.style.display = "block";

    customerGreeting.innerHTML = `Hi ${(customerJSON.name[0]).toUpperCase() + customerJSON.name.slice(1)}! Welcome to your Online Banking Profile`;
    customerWidget.innerHTML = ``;

    const div = document.createElement('div');
    div.setAttribute("class","customer-details");
    div.innerHTML = `   <div class = "customer-table"> 
                        <div class = "customer-column">
                            <div class = "customer-title">ID</div>
                            <div class = "customer-title">Name</div>
                            <div class = "customer-title">Email</div>
                            <div class = "customer-title">Address</div>
                        </div>
                        <div class = "customer-column">
                            <div class = "customer-data customerID" id="customerKey">${customerJSON.customerId}</div>
                            <div class = "customer-data name">${customerJSON.name}</div>
                            <div class = "customer-data email">${customerJSON.email}</div>
                            <div class = "customer-data address">${customerJSON.address}</div>
                        </div>
                        </div>`;

    customerWidget.appendChild(div);
}


