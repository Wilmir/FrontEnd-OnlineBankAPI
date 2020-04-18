const loginForm = document.getElementById("login");


loginForm.addEventListener("submit", event => {
    event.preventDefault();

    console.log("A user has tried to login");
    logIn();

})


async function logIn(){
    const url = `http://localhost:8080/messenger/webapi/customers`;
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
        }else{
            throw new Error("Request failed!");

        }
    } catch(error){
        console.log(error);
    }








}


