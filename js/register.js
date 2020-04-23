const signUpForm = document.getElementById("signup");
const notice = document.getElementById("notice");

signUpForm.addEventListener("submit", event => {
    event.preventDefault();
    console.log("New customer tried to sign up");
    
    signUp();
})

/*Sends post request*/
async function signUp(){
    const url = 'http://localhost:8080/onlinebanking/webapi/customers';

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
            console.log(jsonResponse);
            console.log("The customer has successfully signed up");
            confirmSuccessfulRegistration(name.value);
            clearRegistrationForm(name,email,password,address);
        }else{
            throw new Error("Request failed");
        }    

    }catch(error){
        console.log(error)
    }
}

/*Clears the form after successful registration*/
function clearRegistrationForm(name, email, password, address){
    name.value = "";
    email.value = "";
    password.value ="";
    address.value = "";
}

/*Temporarily display a succesful registration notice*/
function confirmSuccessfulRegistration(name){
    const div = document.createElement('div');
    div.innerHTML = `<div> Hi ${name}! Your profile has successfully been created.</div>`;
    notice.innerHTML = ``;
    notice.style.visibility = "visible";
    signupModal.style.display = "none";
    notice.appendChild(div);
    setTimeout(function(){
        notice.style.visibility = "hidden";
    },5000);
}

