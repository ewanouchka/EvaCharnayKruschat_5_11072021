export const getStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const setStorageItem = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};