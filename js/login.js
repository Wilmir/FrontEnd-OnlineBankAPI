const loginForm = document.getElementById("login");
const entryPoint = document.querySelector(".entry");
const header = document.querySelector("header");

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    console.log("A user has tried to login");
    getCustomer();
})


async function getCustomer(){
    const url = `http://localhost:8080/onlinebanking/webapi/customers`;
    const emailParam = `?email=`;
    const passwordParam = `&password=`;

    const email = loginForm.querySelector("#email");
    const password = loginForm.querySelector("#password");

    const endpoint = `${url}${emailParam}${email.value}${passwordParam}${password.value}`;

    try{
        const response = await fetch(endpoint);

        if(response.ok){
            console.log("Starting to retrieve customer.");
            const customerJSON = await response.json();
            console.log("Retrieval of customer successful");
            console.log(customerJSON);
            /*Hide login form*/
            clearLoginForm(email,password);
            entryPoint.style.display = "none";
            header.style.display = "none";
            renderCustomer(customerJSON);
            
            /*Retrieve and render accounts*/
            const accountsEndpoint = customerJSON.links[1].link;
            
            const accountsJSON = await getAccounts(accountsEndpoint);
            console.log(accountsJSON);
            console.log("Login is successful");


        }else{
            throw new Error("Request failed!");

        }
    } catch(error){
        console.log("Customer not found");
        displayAccountNotFound();
    }
}


async function getAccounts(endpoint){
    const url = endpoint;
    try{
        const response = await fetch(url);
        if(response.ok){
            console.log("Starting to retrieve accounts.");
            const accountsJSON = await response.json()
            console.log("Retrieval of accounts successful");
            renderAccounts(accountsJSON);
            console.log("Rendering of accounts successful");
            return accountsJSON;
        }else{
            throw new Error("Request failed!");

        }
    }catch(error){
        console.log("Accounts retrieval failed");
    }
}

function clearLoginForm(email,password){
    email.value = ``;
    password.value = ``;
}

/*Temporarily display account not found*/
function displayAccountNotFound(){
    const div = document.createElement('div');
    div.innerHTML = `<div> Invalid login credentials! </div>`;
    notice.innerHTML = ``;
    notice.style.visibility = "visible";
    signupModal.style.display = "none";
    notice.appendChild(div);
    setTimeout(function(){
        notice.style.visibility = "hidden";
    },5000);
}