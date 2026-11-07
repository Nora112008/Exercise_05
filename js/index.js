let registerForm = document.querySelector("#Register form"),
registerInputs = registerForm.querySelectorAll("input"),
resetIcon = registerForm.querySelector(".reset"),
students = [],
id = 0,
tableBody = document.querySelector("#Data tbody"),
regexInputs = {
        firstName: /^ *[A-Za-z]+ *$/,
        lastName: /^ *[A-Za-z]+ *$/,
        email: /^[A-Za-z_][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|org)$/,
        age: /^[0-9]{2}$/,
        phone: /^(02)?01(0|1|2|5)[0-9]{8}$/,
    },
    searchInput = document.querySelector("#SearchInput");

    if(localStorage.getItem('students') === null){
        updateLocalstorage();
        }else{
        students = JSON.parse(localStorage.getItem('students'));
        id = students[students.length - 1]?.id ?? 0;
        showStudents(students);
    }



registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    
     registerInputs.forEach(function (input) {
        checkInput(input);
        resetIcon.classList.remove("d-none");

    });

    let formType = registerForm.getAttribute('data-type');
    if(formType == 'add'){
        addStudent();
    }else if(formType == 'edit'){
        editStudent();
    }

   
});

searchInput.addEventListener("keyup", function(){
    search(this.value);
});