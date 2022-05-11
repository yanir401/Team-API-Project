export function saveIntoLocalStorage(object, objectName) {
  const objSerialized = JSON.stringify(object);
  localStorage.setItem(objectName, objSerialized);
}

export function getDataFromLocalStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName));
}
