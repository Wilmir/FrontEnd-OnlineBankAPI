const resultContainer = document.querySelector('.result-container');
const loadPeopleBtn = document.querySelector('.load-people');

async function loadPeople(){
    const url = 'http://localhost:8080/messenger/webapi/profiles';

    try{
        const response = await fetch(url);

        if(response.ok){
            const jsonResponse = await response.json();
    
            renderResponse(jsonResponse);

            console.log(jsonResponse);
        }else{
            throw new Error("Request failed");
        }    

    }catch(error){
        console.log(error)
    }
}


function renderResponse(jsonResponse){
    jsonResponse.forEach(person => {
        const div = document.createElement('div');
        div.innerHTML = `<div> Name: ${person.firstName} ${person.lastName}</div>`;
        resultContainer.appendChild(div);
    });
}


loadPeopleBtn.addEventListener('click', function(){
    resultContainer.innerHTML = '';
    loadPeople();
});


