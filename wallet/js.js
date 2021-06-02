//updateMovementType changes the text shown next to the toggle switch between outcome or income, according with the current checkbox's state
function updateMovementType(checkbox, spanId) {
  //var checkbox = document.getElementById("checkbox");
  var spanText = document.getElementById(spanId);

  if (checkbox.checked) {
    spanText.innerHTML = "Income";
    spanText.classList.remove("red");
    spanText.classList.toggle("green");
  } else {
    spanText.innerHTML = "Outcome";
    spanText.classList.remove("green");
    spanText.classList.toggle("red");
  }
}

//saveMovement saves the movement's info into localStorage
function saveMovement() {
  var movementType = document.getElementById("checkbox").checked;
  var checkboxText;
  var name = document.getElementById("name").value;
  var amount = document.getElementById("amount").value;
  var time = new Date();
  if (movementType == true) {
    checkboxText = "Income";
    if (amount < 0) {
      amount *= -1;
    }
  } else {
    checkboxText = "Outcome";
    if (amount > 0) {
      amount *= -1;
    }
  }
  time =
    time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();

  var movements = readStorage();

  //check if the inputs are not blank
  if (name && amount) {
    var movement = {
      id: movements.length,
      movementType: checkboxText,
      name: name,
      amount: amount,
      time: time,
    };

    movements.push(movement);
    saveLocal(movements);
  } else {
    alert("Fulfill all the spaces");
  }
}

//saveLocal saves the array in the local storage
function saveLocal(movements) {
  localStorage.movements = JSON.stringify(movements);
  var oldTable = document.querySelector("#oldTable");
  oldTable.remove();
  updateTable(readStorage());
}

//readStorage reads the local storage, and returns an array with all the movements.
function readStorage() {
  var movements;
  if (localStorage.movements) {
    movements = JSON.parse(localStorage.movements);
  } else {
    movements = [];
  }
  return movements;
}

//showMovement shows the last movement saved through an alert
/*function showMovement() {
  console.log(readStorage());
}*/

//updateTable creates or updated the data displayed on the table
function updateTable(movements) {
  var table = document.querySelector("#table");
  var headers = ["id", "type", "name", "amount", "time"];

  var newTable = document.createElement("table");
  newTable.setAttribute("id", "oldTable");
  var headerTable = document.createElement("tr");

  headers.forEach((header) => {
    var headerInfo = document.createElement("th");
    var headerText = document.createTextNode(header);
    headerInfo.appendChild(headerText);
    headerTable.appendChild(headerInfo);
  });

  newTable.appendChild(headerTable);

  movements.forEach((movement) => {
    var row = document.createElement("tr");

    Object.values(movement).forEach((info) => {
      var rowInfo = document.createElement("td");
      var rowInfoText = document.createTextNode(info);

      //Assign color to the row, depending on the movement type
      if (info == "Income") {
        row.classList.add("row__green");
      } else if (info == "Outcome") {
        row.classList.add("row__red");
      }
      rowInfo.appendChild(rowInfoText);
      row.appendChild(rowInfo);
    });

    //Create icons and assign ids
    var edit = document.createElement("i");
    edit.classList.add("far");
    edit.classList.add("fa-edit");
    edit.setAttribute("id", movement.id);
    edit.setAttribute("onclick", "editModal(" + movement.id + ")");
    var del = document.createElement("i");
    del.classList.add("far");
    del.classList.add("fa-trash-alt");
    del.setAttribute("id", "-" + movement.id);
    del.setAttribute("onclick", "deleteModal(" + movement.id + ")");

    //create table
    row.appendChild(edit);
    row.appendChild(del);
    newTable.appendChild(row);
  });

  table.appendChild(newTable);
  counter();
}

//editModal opens the modal window to edit a movement
function editModal(id) {
  //show the modal window
  var modal = document.getElementById("modal_edit");
  modal.style.display = "flex";

  //brings the movements info
  var movements = readStorage();
  //brings the movement's info required according the id
  var movement = movements.find((x) => x.id === id);

  //brings the inputs to be used on this function
  var name_edit = document.getElementById("name_edit");
  var amount_edit = document.getElementById("amount_edit");
  var movementType_edit = document.getElementById("movementType_edit");
  var checkbox_edit = document.getElementById("checkbox_edit");
  var movementId = document.getElementById("movementId_edit");

  //assign values to the inputs and checkbox
  name_edit.value = movement.name;
  amount_edit.value = movement.amount;
  movementId.innerText = movement.id;
  movementType_edit.innerText = movement.movementType;
  if (movement.movementType == "Income") {
    checkbox_edit.checked = true;
    movementType_edit.classList.remove("red");
    movementType_edit.classList.add("green");
  } else {
    checkbox_edit.checked = false;
    movementType_edit.classList.remove("green");
    movementType_edit.classList.add("red");
  }
}

//editSave saves the info that has been edited, and update the table
function editSave() {
  //get the values from the form
  var movements = readStorage();
  var id = document.getElementById("movementId_edit");
  id = id.textContent;
  movementId = movements.findIndex((x) => x.id == id);
  var name = document.getElementById("name_edit").value;
  var amount = document.getElementById("amount_edit").value;
  var checkbox = document.getElementById("movementType_edit").textContent;
  movements[movementId].name = name;
  movements[movementId].amount = amount;
  movements[movementId].movementType = checkbox;
  saveLocal(movements);

  closeModal(document.getElementById("modal_edit"));
}

//deleteModal opens the modal window to delete a movement
function deleteModal(id) {
  //brings the movements info
  var movements = readStorage();
  //brings the movement's info required according the id
  var movement = movements.find((x) => x.id === id);

  //show the modal window
  var modal = document.getElementById("modal_delete");
  modal.style.display = "flex";

  //brings the inputs to be used on this function
  var name_delete = document.getElementById("name_delete");
  var amount_delete = document.getElementById("amount_delete");
  var movementType_delete = document.getElementById("movementType_delete");
  var movementId = document.getElementById("movementId_delete");

  //assign values to the inputs and checkbox
  name_delete.value = movement.name;
  amount_delete.value = movement.amount;
  movementId.innerText = movement.id;
  movementType_delete.innerText = movement.movementType;
  if (movement.movementType == "Income") {
    movementType_delete.classList.remove("red");
    movementType_delete.classList.add("green");
  } else {
    movementType_delete.classList.remove("green");
    movementType_delete.classList.add("red");
  }
}

//deleteSave deletes the movement from the cache
function deleteSave() {
  //Look for the id on the DOM
  var id = document.getElementById("movementId_delete").textContent;
  //brings the movements info
  var movements = readStorage();
  var movementId = movements.findIndex((x) => x.id == id);
  //brings the movement's info required according the id
  movements.splice(movementId, 1);
  saveLocal(movements);
  closeModal(document.getElementById("modal_delete"));
}

//closeModal closes the modal window
function closeModal(modal) {
  modal.style.display = "none";
}

//counter calculates the total amount of money, and chooses the color depending if it's negative or positive
function counter() {
  var counterHTML = document.getElementById("counter");
  var counter = 0;
  var movements = readStorage();

  movements.forEach((x) => (counter += parseInt(x.amount)));

  counterHTML.innerText = counter;

  if(counter >= 0) {
    counterHTML.classList.add("green");
    counterHTML.classList.remove("red");
  } else {
    counterHTML.classList.add("red");
    counterHTML.classList.remove("green");
  }
}

updateTable(readStorage());
counter();