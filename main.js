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

const createRow = (students) => {
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
  try {
    const responses = await Promise.all(
      students.map((student) =>
        axios.get(`https://capsules-asb6.herokuapp.com/api/user/${student.id}`)
      )
    );
    const data = responses.map((result) => result.data); // data from response all

    Object.keys(data[0]).forEach((title) => {
      const th = document.createElement("th");
      th.innerText = title;
      titleRow.appendChild(th);
    });
    createRow(data);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

getStudents();
