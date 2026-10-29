let registerForm = document.querySelector("#Register form"),
registerInputs = registerForm.querySelectorAll("input"),
students = [];

registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    let student = {};

    registerInputs.forEach(function(registerInput){
        let key = registerInput.name,
        value = registerInput.value;
        student[key] = value;
    });

addStudent(student);

});