import {
  saveIntoLocalStorage,
  getDataFromLocalStorage,
} from "./js/localStorage.js";

const titleRow = document.getElementById("title-row");
const table = document.getElementById("table");
table.addEventListener("click", (e) => {
  console.dir(e.parentElement);
});

async function getStudentsClass(teacherName, callback) {
  // getStudentsClass

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

const createTitleRow = (keys) => {
  Object.keys(keys).forEach((title) => {
    const th = document.createElement("th");
    th.innerText = title;
    titleRow.appendChild(th);
  });
};

// const createButtons = (tableRow) => {
//   const btn = document.createElement("button");
//   btn.innerHTML = "Edit";
//   tableRow.appendChild(btn);
// };

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
    // createButtons(tr);

    table.appendChild(tr);
  }
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
