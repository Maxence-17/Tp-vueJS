const LocalStorageService = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    clear(key) {
        localStorage.removeItem(key);
    }
};

export default LocalStorageService;
