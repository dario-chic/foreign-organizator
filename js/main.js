var form = document.getElementById('form');
var inputsForm = form.getElementsByTagName('input');
var error = document.getElementById('error');

var userFirtsName = document.getElementById('firtsName');
var userLastName = document.getElementById('lastName');
var userAge = document.getElementById('age');
var userCountry = document.getElementById('country');
const addNewUser = document.getElementById('add-button');
const delNewUser = document.getElementById('del-button');
var userAmount = 0;

addNewUser.addEventListener('click', validation);
delNewUser.addEventListener('click', delUser);
document.addEventListener('keydown', function enter(key){
    
    for (inputs in inputsForm){

        if (key.keyCode == 13 && document.activeElement == inputsForm[inputs]){
            validation();
        }
    }
}
);

var rowContainer = document.getElementById('table-body');
var rowElements = rowContainer.getElementsByTagName('tr');
var padre;

var btns = document.getElementsByClassName('fa-user-times');

function validation(){
    error.innerHTML = '';
    activation();

    function activation(){
        if(userFirtsName.value == '' || userLastName.value == '' || userAge.value == '' || userCountry.value == ''){
            notification();
        } else {
            error.style.display = 'none';
            addUser();
        }
    }
    function notification(){
        if(userFirtsName.value == '' || userFirtsName.value == null){
            error.style.display = 'block';
            error.innerHTML += '<li>Please, write a name.</li>';
        } 
    
        if(userLastName.value == '' || userLastName.value == null){
            error.style.display = 'block';
            error.innerHTML += '<li>Please, write a Last Name</li>';
        }
    
        if(userAge.value == '' || userAge.value == null){
            error.style.display = 'block';
            error.innerHTML += '<li>Please, write an age</li>';
        }
    
        if(userCountry.value == '' || userCountry.value == null){
            error.style.display = 'block';
            error.innerHTML += '<li>Please, write a country</li>';
        }
    }
}

function addUser(){
    var userData = [];
    // * At firts time we obtain every inputs value
    for (value in inputsForm){
        userData.push(inputsForm[value].value);
    }

// ! There is a bug that makes 3 elements more instead only 4, i never knew what happened, so i fixed it with this code, it works good now
    while(userData.length > 4){
        userData.pop();
    }

// ** At this point i created a necessary 'tr' to add users data as 'td' after
    var newRow = document.createElement('tr')
    userAmount = rowElements.length;
    newRow.id = 'user' + (userAmount); //* it works to assign an ordered list via numbers id
    rowContainer.appendChild(newRow);

// ** this section works adding 'tr' elements with users data into 'td' created before
    for (data in userData){
        var dataSelect = document.createTextNode(userData[data].charAt(0).toUpperCase() + userData[data].slice(1).toLowerCase());

        var rowData = document.createElement('td');
        rowData.appendChild(dataSelect);

        var rowDataContainer = document.getElementById(newRow.id)
        rowDataContainer.appendChild(rowData);


// ** this section works adding classname and id into 'tr'
        if(userData[data] == userFirtsName.value){
            rowData.className = 'userName';
            rowData.id = 'userName' + userAmount;
            // var btnbtn = rowData.id;
            // addDelBtn(btnbtn);
        }       
        else if(userData[data] == userLastName.value){
            rowData.className = 'userLastName';
            rowData.id = 'userLastName' + userAmount;
            btnID = rowData.id;
        }        
        else if(userData[data] == userAge.value){
            rowData.className = 'userAge';
            rowData.id = 'userAge' + userAmount;
        }         
        else if(userData[data] == userCountry.value){
            rowData.className = 'userCountry';
            rowData.id = 'userCountry' + userAmount;
        }
    }
    addDelBtn();
// ** Reset all items to initial settings
    userFirtsName.value = '';
    userLastName.value = '';
    userAge.value = '';
    userCountry.value = '';
    userData = [];
}

function delUser(){
    userAmount = rowElements.length;
    var userSelect = userAmount - 1;
    rowContainer.removeChild(rowElements[userSelect]);
    toFixOrder()
}

function addDelBtn(){

    var btn = document.createElement('i')
    btn.className = (`fas fa-user-times`);
    var btnContainer = document.getElementById('userName' + userAmount);
    btnContainer.appendChild(btn);
    btn.addEventListener('click', delBtn);
}


function delBtn(){
    var father = this.parentNode;
    var grandfather = father.parentNode;
    var grandgrandfather = grandfather.parentNode;
    grandgrandfather.removeChild(grandfather);
    toFixOrder();
}

function toFixOrder(){
    for (var tr in rowElements){
        rowElements[tr].id = 'user' + tr;
    }
    userAmount = rowElements.length;
}
