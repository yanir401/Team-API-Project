export function saveIntoLocalStorage(object) {
  const objSerialized = JSON.stringify(object);
  localStorage.setItem("data", objSerialized);
}

export function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem("data"));
}
