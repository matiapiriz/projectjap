const email = localStorage.email
document.getElementById("inputEmail").value = email;

const element = document.getElementById("saveBtn");

function checklocaldata(localId, pushId) {
    const data = localStorage.getItem(localId)
    if (data != null) {
        document.getElementById(pushId).value = data;
    }
}

checklocaldata("name", "inputFirstname");
checklocaldata("lastname", "inputLastname");
checklocaldata("surname", "inputFirstsurname");
checklocaldata("lastsurname", "inputLastsurname");
checklocaldata("number", "inputContactNumber");

function savelocaldata(localId, inputId){
    const data = document.getElementById(inputId).value;
    if (data != "") {
        localStorage.setItem(localId, data);
    }
}

function saveformdata() {
    savelocaldata("name", "inputFirstname");
    savelocaldata("lastname", "inputLastname");
    savelocaldata("surname", "inputFirstsurname");
    savelocaldata("lastsurname", "inputLastsurname");
    savelocaldata("email", "inputEmail");
    savelocaldata("number", "inputContactNumber");  
}

element.addEventListener("click", function() {
    const name = document.getElementById("inputFirstname").value
    const surname = document.getElementById("inputFirstsurname").value
    
    if (name == "") {
        document.getElementById("inputFirstname").classList.add("is-invalid")
    }
    if (surname == "") {
        document.getElementById("inputFirstsurname").classList.add("is-invalid")
    }

    if (name != "" && surname != "") {
        saveformdata()
    }
  });