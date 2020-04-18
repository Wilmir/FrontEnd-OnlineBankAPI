const signUpForm = document.getElementById("signup");
const signUpNotice = document.getElementById("signup-notice");

signUpForm.addEventListener("submit", event => {
    event.preventDefault();
    console.log("New customer tried to sign up");
    
    signUp();


})

/*Sends post request*/
async function signUp(){
    const url = 'http://localhost:8080/messenger/webapi/customers';

    const name = signUpForm.querySelector("#name");
    const email = signUpForm.querySelector("#email");
    const password = signUpForm.querySelector("#password");
    const address = signUpForm.querySelector("#address");

    const data = {
        "name":name.value,
        "email":email.value,
        "password":password.value,
        "address":address.value
    }

    try{
        const response = await fetch(url, 
                                    {
                                       method: 'POST',
                                       headers:
                                            {
                                                "Accept": "application/json",
                                                "Content-Type": "application/json"  
                                            },
                                       body: JSON.stringify(data)
                                    });

        if(response.ok){
            const jsonResponse = await response.json();
            console.log("The customer has successfully signed up");
            console.log(jsonResponse);
            confirmSuccessfulRegistration(name.value);
            clearForm(name,email,password,address);
        }else{
            throw new Error("Request failed");
        }    

    }catch(error){
        console.log(error)
    }
}

/*Clears the form after successful registration*/
function clearForm(name, email, password, address){
    name.value = "";
    email.value = "";
    password.value ="";
    address.value = "";
}

/*Temporarily display a succesful registration notice*/
function confirmSuccessfulRegistration(name){
    const div = document.createElement('div');
    div.innerHTML = `<div> Hi ${name}! Your profile has successfully been created.</div>`;
    signUpNotice.style.visibility = "visible";
    signUpNotice.appendChild(div);
    setTimeout(function(){
        signUpNotice.style.visibility = "hidden";
    },5000);
}