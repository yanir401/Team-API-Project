import {
  saveIntoLocalStorage,
  getDataFromLocalStorage,
} from "./js/localStorage.js";

const titleRow = document.getElementById("title-row");
const table = document.getElementById("table");
const header = document.getElementById("header");

table.addEventListener("click", (e) => {});
const h2 = document.createElement("h2");
h2.innerText = "My Capsule";
header.appendChild(h2);

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Search...";
// const arrayOfStudents = getDataFromLocalStorage("students");

const handleInput = (event) => {
  const inputValue = event.target.value;
  const filteredArr = [];
  arrayOfStudents.forEach((student) => {
    for (const key in student) {
      const convertString = "" + student[key];
      if (convertString.includes(inputValue)) filteredArr.push(student);
    }
  });
  while (table.children.length > 1) {
    // if (table.lastChild.nodeName !== "TBODY")
    table.removeChild(table.lastChild);
  }
  createRow(filteredArr);
  // for (const iterator of filteredArr) {
  //   const tr = document.createElement("tr");

  //   for (const key in iterator) {
  //     const td = document.createElement("td");
  //     td.innerText = iterator[key];
  //     tr.appendChild(td);
  //   }
  //   createButtons(tr);

  //   table.appendChild(tr);
  // }
};

header.appendChild(input);
const arrayOfStudents = getDataFromLocalStorage("students");

// const handleInput = (event) => {
//   const inputValue = event.target.value;
//   const filteredArr = [];
//   arrayOfStudents.forEach((student) => {
//     for (const key in student) {
//       const convertString = "" + student[key];
//       if (convertString.includes(inputValue)) filteredArr.push(student);
//     }
//   });
//   [...table.children].forEach((child, i) => {
//     console.log(child);
//     console.log(filteredArr[i]);
//     // if (child.firstChild.localName !== "tr") {
//     //   const idElement = child.firstChild;
//     //   console.log(idElement, filteredArr[i].id);
//     //   if (idElement !== filteredArr[i].id) {
//     //     child.remove();
//     //   }
//     // } else i -= 1;
//   });
// };

input.addEventListener("input", handleInput);

input.addEventListener("input", handleInput);

async function getStudentsClass(teacherName, callback) {
  const dataFromLocalStorage = getDataFromLocalStorage("StudentsClass");
  if (!dataFromLocalStorage)
    try {
      const { data: students } = await axios.get(
        `https://capsules-asb6.herokuapp.com/api/teacher/${teacherName}`
      );
      saveIntoLocalStorage(students, "StudentsClass");

      return students;
    } catch (error) {
      console.error("Something went wrong", error);
    }
  else return dataFromLocalStorage;
}

//change it later
const createTitleRow = (keys) => {
  if (!titleRow.children.length > 0) {
    const select = document.createElement("select");
    Object.keys(keys).forEach((title) => {
      const th = document.createElement("th");
      th.innerText = title;
      titleRow.appendChild(th);
      const option = document.createElement("option");
      option.innerText = title;
      select.appendChild(option);
    });

    const th = document.createElement("th");
    th.colSpan = "1";
    titleRow.appendChild(th);
    header.appendChild(select);
  }
};

function handleDelete() {
  this.parentElement.remove();
}
const createButtons = (tableRow) => {
  const btnEdit = document.createElement("button");
  const btnDelete = document.createElement("button");
  btnEdit.innerHTML = "Edit";
  btnDelete.innerHTML = "delete";
  btnDelete.addEventListener("click", handleDelete);
  tableRow.appendChild(btnEdit);
  tableRow.appendChild(btnDelete);
};

const createRow = (students) => {
  createTitleRow(students[0]);
  for (const studentObject of students) {
    // Change it later
    const tr = document.createElement("tr");
    for (const key in studentObject) {
      const td = document.createElement("td");
      td.innerText = studentObject[key];
      tr.appendChild(td);
    }

    createButtons(tr);
    table.appendChild(tr);
  }
  const test = getDataFromLocalStorage("students");
  // test[0].id = 433;
  // saveIntoLocalStorage(test, "students");
  // console.log(test[0]);
};

const getStudents = async () => {
  const students = await getStudentsClass("toam");
  const dataFromLocalStorage = getDataFromLocalStorage("students");

  if (!dataFromLocalStorage) {
    titleRow.innerHTML = "Loading....";
    console.log("call Api");
    try {
      const responses = await Promise.all(
        students.map((student) =>
          axios.get(
            `https://capsules-asb6.herokuapp.com/api/user/${student.id}`
          )
        )
      );
      titleRow.innerHTML = "";
      const data = responses.map((result) => result.data); // data from response all
      saveIntoLocalStorage(data, "students");

      createRow(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  } else createRow(dataFromLocalStorage);
};

getStudents();
