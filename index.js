const toDoForm = document.querySelector('form');
const toDoInput = document.getElementById('to-do-input');
const toDoListUL = document.getElementById('to-do-list');

let allToDos = getToDos();
updateToDoList();

toDoForm.addEventListener('submit', function (e) {
   e.preventDefault();
   addToDo();
})

function addToDo() {
   const toDoText = toDoInput.value.trim();
   if (toDoText.length > 0) {
      const toDoObject = {
         text: toDoText,
         completed: false
      }
      allToDos.push(toDoObject);
      updateToDoList();
      saveToDos();
      toDoInput.value = "";
   }
}

function updateToDoList() {
   toDoListUL.innerHTML = "";
   allToDos.forEach((toDo, toDoIndex) => {
      toDoItem = createToDoItem(toDo, toDoIndex);
      toDoListUL.append(toDoItem);
   });
}

function createToDoItem(toDo, toDoIndex) {
   const toDoID = "toDo-" + toDoIndex;
   const toDoLI = document.createElement("li");
   const toDoText = toDo.text;
   toDoLI.className = "toDo";
   toDoLI.innerHTML = `<li class="to-do">
            <input type="checkbox" id="${toDoID}">
            <label for="${toDoID}" class="custom-checkbox">
               <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#1f1f1f">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
               </svg>
            </label>
            <label for="${toDoID}" class="to-do-text">
               ${toDoText}
            </label>
            <button class="delete-button">
               <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
         </li>`
   const deleteButton = toDoLI.querySelector(".delete-button");
   deleteButton.addEventListener("click", () => {
      deleteToDoItem(toDoIndex);
   });
   const checkbox = toDoLI.querySelector("input");
   checkbox.addEventListener("change", ()=>{
      allToDos[toDoIndex].completed = checkbox.checked;
      saveToDos();
   })
   checkbox.checked = toDo.completed;
   return toDoLI;
}

function deleteToDoItem(toDoIndex){
   allToDos = allToDos.filter((_, i)=> i !== toDoIndex);
   saveToDos();
   updateToDoList();
}

function saveToDos() {
   const toDosJSON = JSON.stringify(allToDos);
   localStorage.setItem("toDos", toDosJSON);
}

function getToDos() {
   const toDos = localStorage.getItem("toDos") || "[]";
   return JSON.parse(toDos);
}