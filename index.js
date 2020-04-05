const resultContainer = document.querySelector('.result-container');
const loadPeopleBtn = document.querySelector('.load-people');

function loadPeople(){
    fetch('http://localhost:8080/messenger/webapi/profiles')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        data.forEach(function(person){
            const div = document.createElement('div');
            div.innerHTML = person.firstName;
            resultContainer.appendChild(div);
        })
    });
}

loadPeopleBtn.addEventListener('click', function(){
    resultContainer.innerHTML = '';
    loadPeople();
});


