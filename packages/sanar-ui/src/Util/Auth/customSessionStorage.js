const CustomSessionStorage = {
    // set item with the key
    setItem: (key, value) => {
        sessionStorage.setItem(key, value)
        return value
    },
    // get item with the key
    getItem: key => {
        return sessionStorage.getItem(key)
    },
    // remove item with the key
    removeItem: key => {
        sessionStorage.removeItem(key)
    },
    // clear out the storage
    clear: () => {
        sessionStorage.clear()
    }
}

export default CustomSessionStorage
