
function getStudent (id){
     let student = { id : id};
    

    registerInputs.forEach(function(registerInput){
        let key = registerInput.name,
        value = registerInput.value;
        student[key] = value;
    });
    return student;
}


function addStudent(){
     let focusInput = registerForm.querySelector("input:focus"),
     InvalidInput = registerForm.querySelector("input[data-valid='false']");
    focusInput?.blur();

    let invalidInput = registerForm.querySelector("input.is-invalid");

    if(invalidInput !== null || InvalidInput !== null){
        return;
    }


   
    let student = getStudent(++id);

    students.push(student);
        updateLocalstorage();

    showStudent(student);
    isNoData(students);

    resetForm();

}

function showStudent(student){
    tableBody.innerHTML += `
     <tr data-student-id="${student.id}">
      <th>${student.id}</th>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.phone}</td>
      <td>
        <div class="buttons">
            <button class="btn btn-info text-light" onclick="insertStudentIntoForm(${student.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteStudent(${student.id}, this)">Delete</button>
        </div>
      </td>
    </tr>
    `;
}


function checkInput(input){
    let inputName = input.name,
    inputValue = input.value,
    isEmpty = inputValue === "",
    errorEle = document.querySelector(`p.alert[data-error-name="${inputName}"]`),
    isInvalid = !regexInputs[inputName].test(inputValue),
    errorMsg = "",
    isExistEmail = false,
        isExistPhone = false,
        existId;

    resetIcon.classList.remove("d-none");
 if (inputName == "email" || inputName == "phone") {

        for (let student of students) {

            if (registerForm.getAttribute('data-type') == 'edit' && registerForm.dataset.studentId == student.id) {
                continue;

            } else if (student.email == inputValue) {
                isExistEmail = true;
                existId = student.id;

            } else if (student.phone == inputValue) {
                isExistPhone = true;
                existId = student.id;
            }
        };
    }
    
    if(isEmpty){
        errorMsg = "This field is required."
    }else if(isInvalid){
        errorMsg = "Invalid Field."
    }else if (isExistEmail) {
         errorMsg = "This email already exists.";

    } else if (isExistPhone) {
         errorMsg = "This phone already exists.";
    }
    
     if(isEmpty || isInvalid || isExistEmail || isExistPhone){
        input.classList.add("is-invalid");
        errorEle.textContent = errorMsg;
        errorEle.classList.remove('d-none');
        input.classList.remove("is-valid");
        input.dataset.valid = false;
    }else{
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errorEle.classList.add('d-none');
        input.dataset.valid = true;
    }
}


function resetForm(skip = ""){
    registerForm.reset();
    
    let formBtn = registerForm.querySelector("button");

    registerInputs.forEach(function(input){
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
        let errorEle = document.querySelector(`p.alert[data-error-name="${input.name}"]`);
        errorEle.classList.add('d-none');
    });

    registerForm.setAttribute('data-type', 'add');
        formBtn.classList.remove('btn-info', 'text-light');
        formBtn.classList.add('btn-success');
        formBtn.textContent = "Add"; 

    if (searchInput) {
        searchInput.removeAttribute("disabled");
    }

    if (skip === "skipTable") {
        let allTableButtons = tableBody.querySelectorAll("button");
        allTableButtons.forEach(function(btn) {
            btn.removeAttribute("disabled"); 
            if(btn.textContent === "Undo") {
                btn.textContent = "Edit";
                btn.classList.remove("btn-warning");
                btn.classList.add("btn-info", "text-light");
                btn.setAttribute("onclick", btn.getAttribute("onclick").replace("resetForm()", `insertStudentIntoForm` + btn.closest('tr').dataset.studentId));
            }
        });
    } else {
        showStudents(students);
    }
}

function updateLocalstorage(){
    localStorage.setItem('students', JSON.stringify(students));
}

function showStudents(data){
    tableBody.innerHTML = `
    <tr>
    <td id="TableAlert" class="table-warning text-center" colspan="7">There are no data</td>
   </tr>
   `;
    data.forEach(function(student){
        showStudent(student);
    });

    isNoData(data);
}


function getStudentIndex(id){
    return students.findIndex((student) => student.id == id);
}
function deleteStudent(id, that){

     let confirmPopup = document.querySelector(".popup"),
        confirmYesBtn = document.querySelector("#yes"),
        confirmNoBtn = document.querySelector("#no");

    confirmPopup.classList.add("active");
    setTimeout(function () {
        confirmPopup.classList.add("show");
    }, 100);

    confirmNoBtn.onclick = function () {
        confirmPopup.classList.remove("show");
        setTimeout(function () {
            confirmPopup.classList.remove("active");
        }, 500);
    }

    confirmYesBtn.onclick = function () {
        confirmPopup.classList.remove("show");
        setTimeout(function () {
            confirmPopup.classList.remove("active");
        }, 500);

    let studentIndex = getStudentIndex(id),
    trEle = that.closest('tr');


    students.splice(studentIndex, 1);
    trEle.remove();

    updateLocalstorage();

    isNoData(students);
}
}
function isNoData(data){
    let tableAlert = document.querySelector("#TableAlert");
    if(data.length == 0){
        tableAlert.classList.remove('d-none');
    }else{
        tableAlert.classList.add('d-none');
    }
}

function insertStudentIntoForm(id){
    resetForm();

    let editStudent = students.find(function(student){
        return student.id == id;
    }),
    formBtn = registerForm.querySelector("button");
    for(let input of registerInputs){
        input.value = editStudent[input.name];
    }

    resetIcon.classList.remove("d-none");
    formBtn.textContent = "Edit";

    formBtn.classList.add('btn-info', 'text-light');
    formBtn.classList.remove('btn-success');

    registerForm.setAttribute('data-type', 'edit');
    registerForm.setAttribute('data-student-id', id);
     searchInput.value = "";
    searchInput.setAttribute("disabled", "");
     let allTableButtons = tableBody.querySelectorAll("button");
    allTableButtons.forEach(function(btn){
        btn.setAttribute("disabled", "")
    })
     let trEle = tableBody.querySelector(`tr[data-student-id="${id}"]`);
    let editBtnInTable = trEle.querySelector("button.btn-info"); 
    
    if (editBtnInTable) {
        editBtnInTable.removeAttribute("disabled"); 
        editBtnInTable.textContent = "Undo";
        editBtnInTable.classList.remove("btn-info", "text-light");
        editBtnInTable.classList.add("btn-primary"); 
        editBtnInTable.setAttribute("onclick", "resetForm()"); 
    }
}

function editStudent(){
    let confirmPopup = document.querySelector(".popup"),
        confirmYesBtn = document.querySelector("#yes"),
        confirmNoBtn = document.querySelector("#no");

    confirmPopup.classList.add("active");
    setTimeout(function () {
        confirmPopup.classList.add("show");
    }, 100);

    confirmNoBtn.onclick = function () {
        confirmPopup.classList.remove("show");
        setTimeout(function () {
            confirmPopup.classList.remove("active");
        }, 500);
    }

    confirmYesBtn.onclick = function () {
        confirmPopup.classList.remove("show");
        setTimeout(function () {
            confirmPopup.classList.remove("active");
        }, 100);
        
        let studentId = registerForm.dataset.studentId,
        student = getStudent(studentId),
        studentIndex = getStudentIndex(studentId),
        trEle = tableBody.querySelector(`tr[data-student-id="${studentId}"]`);
        

        students[studentIndex] = student;
        trEle.innerHTML = `
        <th>${student.id}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.phone}</td>
      <td>
        <div class="buttons">
        <button id="edit" class="btn btn-info text-light" onclick="insertStudentIntoForm(${student.id})">Edit</button>
        <button id="del" class="btn btn-danger" onclick="deleteStudent(${student.id}, this)">Delete</button>
        </div>
        </td>`;
        resetIcon.classList.add("d-none");
        trEle.classList.add("table-success");
        setTimeout(function () {
        trEle.className = "";
    }, 700);

        updateLocalstorage();
        
        resetForm("skipTable");
        isNoData(students);
    }
}

function search(searchValue){
    let filteredStudents = students.filter(function(student){
        return student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.email.toLowerCase().includes(searchValue.toLowerCase())||
        student.age.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.phone.toLowerCase().includes(searchValue.toLowerCase());
    });

    showStudents(filteredStudents);
}