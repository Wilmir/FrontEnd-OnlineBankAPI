const signUpBtn = document.getElementById("signupoption");

const signupModal = document.querySelector(".modalSignUp");

const signupModalContent = document.querySelector(".modalSignUpContent")

const closeModalBtn = document.querySelector(".closeSignUp")

signUpBtn.addEventListener("click", function(){
    signupModal.style.display = "block";
});

closeModalBtn.addEventListener("click", function(){
    signupModal.style.display = "none";
});

signupModal.addEventListener("click", function(event){
    if(event.target == signupModal || event.target == signupModalContent){
        signupModal.style.display = "none";
    }
});