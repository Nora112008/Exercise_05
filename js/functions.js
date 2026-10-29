function addStudent(student){
    validateStudent(student);
}

function validateStudent(student){

    let regexInputs = {
        firstName: /^[A-Za-z]+$/,
        lastName: /^[A-Za-z]+$/,
        email: /^[A-Za-z_][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|org)$/,
        age: /^[0-9]{2}$/,
        phone: /^(02)?01(0|1|2|5)[0-9]{8}$/,
    };

    for(let field in student){
        let inputName = field,
        inputValue = student[field];
        if(regexInputs[inputName].test(inputValue)){
        }
    }
}