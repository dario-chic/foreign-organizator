let form = document.getElementById("form");
let inputsForm = form.getElementsByTagName("input");
let error = document.getElementById("error");

let userFirtsName = document.getElementById("firtsName");
let userLastName = document.getElementById("lastName");
let userAge = document.getElementById("age");
let userCountry = document.getElementById("country");
let userAmount = 0;

const addNewUser = document.getElementById("add-button");
const delNewUser = document.getElementById("del-button");

let rowContainer = document.getElementById("table-body");
let rowElements = rowContainer.getElementsByTagName("tr");

let btns = document.getElementsByClassName("fa-user-times");
let btnEdit = document.getElementsByClassName("fa-edit");

var onlyOne = 0;

function validation() {
	// !--------------------------------
	function check() {
		if (userFirtsName.value == "" || userLastName.value == "" || userAge.value == "" || userCountry.value == "") {
			notification();
		} else {
			error.style.display = "none";
			addUser();
		}
	}
	function notification() {
		let acc = 0;

		let notifications = ["<li>Please, write a Name</li>", "<li>Please, write a Last Name</li>", "<li>Please, write an Age</li>", "<li>Please, write a Country</li>"];

		for (element in userData) {
			if (userData[element] == "") {
				error.innerHTML += notifications[element];
				acc++;
			} else if (acc == 4) {
				console.log("add");
			}
			error.style.display = "block";
		}
		// }
	}
	//
	let userData = [userFirtsName.value, userLastName.value, userAge.value, userCountry.value];
	error.innerHTML = "";
	check();
	// !-------------------------------
}

function addUser() {
	// !-------------------------------
	userAmount++;

	let userData = [userFirtsName.value, userLastName.value, userAge.value, userCountry.value];

	let classes = ["userName", "userLastName", "userAge", "userCountry"];

	let newRow = document.createElement("tr");
	newRow.id = "user" + userAmount;
	rowContainer.appendChild(newRow);

	for (data in userData) {
		let dataSelect = document.createTextNode(userData[data].charAt(0).toUpperCase() + userData[data].slice(1).toLowerCase());

		let rowData = document.createElement("td");
		rowData.appendChild(dataSelect);

		let rowDataContainer = document.getElementById(newRow.id);
		rowDataContainer.appendChild(rowData);

		rowData.className = classes[data];
		rowData.id = classes[data] + userAmount;

		addEditBtn(rowData.id);
		addDelBtn(rowData.id, rowData.className);
	}
	userFirtsName.value = "";
	userLastName.value = "";
	userAge.value = "";
	userCountry.value = "";
	// !-------------------------------
}

function delUser() {
	// !-------------------------------
	var userSelect = userAmount - 1;

	rowContainer.removeChild(rowElements[userSelect]);
	toFixOrder();
	// !-------------------------------
}

// function addDelBtn2() {
// 	// !-------------------------------
// 	let btn = document.createElement("i");
// 	btn.className = `fas fa-user-times`;
// 	let btnContainer = document.getElementById("userName" + userAmount);
// 	btnContainer.appendChild(btn);

// 	btn.addEventListener("click", function () {
// 		let father = this.parentNode;
// 		let grandfather = father.parentNode;
// 		let grandgrandfather = grandfather.parentNode;
// 		grandgrandfather.removeChild(grandfather);
// 		toFixOrder();
// 	});
// 	// !-------------------------------
// }

function addDelBtn(id, clase) {
	// !-------------------------------
	if (clase == "userName") {
		let btn = document.createElement("i");
		btn.className = `fas fa-user-times`;
		let btnContainer = document.getElementById(id);
		btnContainer.appendChild(btn);

		btn.addEventListener("click", function () {
			let father = this.parentNode;
			let grandfather = father.parentNode;
			let grandgrandfather = grandfather.parentNode;
			grandgrandfather.removeChild(grandfather);
			toFixOrder();
		});
	}
	// !-------------------------------
}

function addEditBtn(id) {
	// !-------------------------------
	let btn = document.createElement("i");
	btn.className = `far fa-edit`;
	let btnContainer = document.getElementById(id);
	btnContainer.appendChild(btn);

	btn.addEventListener("click", openEdit);
}

function openEdit() {
	if (onlyOne == 0) {
		onlyOne = 1;
		let container = this.parentNode;
		let containerID = container.id;
		let containerClass = container.className;
		let valueBackup = container.innerHTML;

		let backupReady = valueBackup.replace(`<i class="far fa-edit"></i><i class="fas fa-user-times"></i><i class="far fa-edit"></i>`, "");
		container.innerHTML = null;

		let newDiv = document.createElement("div");
		newDiv.className = `edit`;
		newDiv.id = `edit`;
		newDiv.innerHTML = `<input type="text" class="text-edit" id="data-edit" placeholder="Edita...">
             <button class="inputs-name__add-button" id="accept-edit-button">Accept</button>
               <button class="inputs-name__del-button" id="cancel-edit-button">Cancel</button>`;

		container.appendChild(newDiv);

		let edit = document.getElementById(`edit`);
		edit.style.display = "grid";

		let accept = document.getElementById("accept-edit-button");
		let newData = document.getElementById("data-edit");

		function acceptEdit() {
			if (newData.value == "" || newData.value == null) {
				cancelEdit();
			} else {
				let add = newData.value.charAt(0).toUpperCase() + newData.value.slice(1).toLowerCase();
				container.innerHTML = `${add}`;
				addDelBtn(containerID, containerClass);
				addEditBtn(containerID);
				edit.style.display = "none";
				onlyOne = 0;
			}
		}

		function cancelEdit() {
			container.innerHTML = backupReady;
			addDelBtn(containerID, containerClass);
			addEditBtn(containerID);
			edit.style.display = "none";
			onlyOne = 0;
		}

		accept.addEventListener("click", acceptEdit);

		document.addEventListener("keydown", function (key) {
			if (key.keyCode == 13 && document.activeElement == newData) acceptEdit();
		});

		let cancel = document.getElementById("cancel-edit-button");

		cancel.addEventListener("click", cancelEdit);
	}
}

function toFixOrder() {
	// !-------------------------------
	for (tr in rowElements) {
		rowElements[tr].id = "user" + ++tr;
	}
	userAmount--;
	toFixId();
	// !-------------------------------
}

function toFixId() {
	let classes = ["userName", "userLastName", "userAge", "userCountry"];

	for (tr in rowElements) {
		let padreActual = document.getElementById(rowElements[tr].id);
		let actual = padreActual.getElementsByTagName("td");
		console.log(actual[2]);
		let number = parseInt(tr) + 1;

		for (td in actual) {
			actual[td].id = classes[td] + number;
		}
	}
}

addNewUser.addEventListener("click", validation);

delNewUser.addEventListener("click", delUser);

document.addEventListener("keydown", function (key) {
	for (inputs in inputsForm) {
		if (key.keyCode == 13 && document.activeElement == inputsForm[inputs]) {
			validation();
		}
	}
});
