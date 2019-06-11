const CustomLocalStorage = {
    // set item with the key
    setItem: (key, value) => {
        localStorage.setItem(key, value)
        return value
    },
    // get item with the key
    getItem: key => {
        return localStorage.getItem(key)
    },
    // remove item with the key
    removeItem: key => {
        localStorage.removeItem(key)
    },
    // clear out the storage
    clear: () => {
        localStorage.clear()
    }
}

export default CustomLocalStorage
