const loginForm = document.getElementById("login");
const logInNotice = document.getElementById("login-notice")


loginForm.addEventListener("submit", event => {
    event.preventDefault();

    console.log("A user has tried to login");
    logIn();


})


async function logIn(){
    const url = `http://localhost:8080/onlinebanking/webapi/customers`;
    const emailParam = `?email=`;
    const passwordParam = `&password=`;

    const email = loginForm.querySelector("#email");
    const password = loginForm.querySelector("#password");

    const endpoint = `${url}${emailParam}${email.value}${passwordParam}${password.value}`;

    try{
        const response = await fetch(endpoint);

        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            console.log("Log In is successful");
            confirmSuccessfulLogin(jsonResponse.name)
            clearLoginForm(email,password);
            renderCustomer(jsonResponse);

        }else{
            throw new Error("Request failed!");

        }
    } catch(error){
        console.log("Customer not found");
    }
}


function clearLoginForm(email,password){
    email.value = ``;
    password.value = ``;
}


/*Temporarily display a succesful registration notice*/
function confirmSuccessfulLogin(name){
    const div = document.createElement('div');
    div.innerHTML = `<div> Hi ${name}! You have successully loggedin.</div>`;
    logInNotice.style.visibility = "visible";
    logInNotice.appendChild(div);
    setTimeout(function(){
        logInNotice.style.visibility = "hidden";
        div.innerHTML = ``;
    },5000);
}