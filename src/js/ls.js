/*  __          _______.          __       _______.
|  |        /       |         |  |     /       |
|  |       |   (----`         |  |    |   (----`
|  |        \   \       .--.  |  |     \   \    
|  `----.----)   |    __|  `--'  | .----)   |   
|_______|_______/    (__)\______/  |_______/    
                                                



/* 
read a value from local storage and parse it as JSON @param {string} key
The key under which the value is stored in LS
@return {array} The value as an array of objects 
*/

export const readFromLS = (lskey) => { 
    if (checkExistLS(lskey)) { 
        return JSON.parse(localStorage.getItem(lskey));
    } else {
        return [];
    }
}

/*
write an array of objects to local storage under the provided key @param {string} key The key under which the value is stored under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.
*/

export const checkExistLS = (lskey) => localStorage.getItem(lskey) ? true : false;

// Create backup of local storage item as JSON file
export const backupLS = (lskey) => {
    let lsData = readFromLS(lskey);
    let lsBackup = JSON.stringify(lsData);
    let file = new Blob([lsBackup], { 
        type: 'application/json' 
    });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'backup.json';
    a.click();
}

// Recover local storage item from JSON file previously downloaded
export const recoverLS = (lskey) => {
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.onload = function () {
        let lsData = JSON.parse(reader.result);
        writeToLS(lskey, lsData);
    }
    reader.readAsText(file);
}


// Clear local storage item @param {string} key The key under which the value is stored under in LS
export const clearLS = (lskey) => localStorage.removeItem(lskey);

export const writeToLS = (lskey, list) => localStorage.setItem(lskey, JSON.stringify(list));

// remove selected item from localStorage
export const removeFromLS = (lskey, id) => localStorage.removeItem(lskey, id);



// export { readFromLS, writeToLS, removeFromLS };