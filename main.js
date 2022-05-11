import {
  saveIntoLocalStorage,
  getDataFromLocalStorage,
} from "./js/localStorage.js";

const titleRow = document.getElementById("title-row");
const table = document.getElementById("table");

async function getStudentsClass(teacherName, callback) {
  // getStudentsClass
  try {
    const { data: students } = await axios.get(
      `https://capsules-asb6.herokuapp.com/api/teacher/${teacherName}`
    );
    return students;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

// for (const student of students) {
//     // sync of async ????
//     const res = await axios.get(
//       ` https://capsules-asb6.herokuapp.com/api/user/${student.id}`
//     );
//     //   console.log(res.data);
//     const th = document.createElement("th");
//     const titleText = Object.keys(res.data);
//     console.log(titleText);
//     titleRow.innerHTML += `${res.data.firstName}<br>`;
//   }

const createTitleRow = (keys) => {
  Object.keys(keys).forEach((title) => {
    const th = document.createElement("th");
    th.innerText = title;
    titleRow.appendChild(th);
  });
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
    table.appendChild(tr);
  }
};

const getStudents = async () => {
  const students = await getStudentsClass("toam");
  const dataFromLocalStorage = getDataFromLocalStorage();
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
      saveIntoLocalStorage(data);

      createRow(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  } else {
    console.log("call Local Storage");

    createRow(dataFromLocalStorage);
  }
};

getStudents();
