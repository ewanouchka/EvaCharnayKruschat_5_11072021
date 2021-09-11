export const getStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const setStorageItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const removeStorageItem = (name) => {
  localStorage.removeItem(name);
};

export const emptyLocalStorage = (orderId, total) => {
  removeStorageItem(orderId);
  removeStorageItem(total);
};
