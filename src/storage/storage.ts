const storage = {
  setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
  getItem: (key: string): string | null => sessionStorage.getItem(key),
  removeItem: (key: string) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};

export default storage;
