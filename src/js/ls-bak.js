//const fs = require('fs');
//const readline = require('readline');
/* const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

*/

//  ORIGINAL LOCAL STORAGE FUNCTIONS

/* read a value from local storage and parse it as JSON @param {string} key
The key under which the value is stored in LS
@return {array} The value as an array of objects */
const readFromLS = lskey => localStorage.getItem(lskey); 
/*
write an array of objects to local storage under the provided key @param {string} key The key under which the value is stored under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.
*/
const writeToLS = (lskey, list) =>  localStorage.setItem(lskey, list);

// remove selected item from localStorage
const removeFromLS = (lskey, id) => localStorage.removeItem(lskey, id);

/*s


const goalFile = 'goals.json';
// const readFromLS = (lskey) => {
//     try {
        
//         //const data = fs.readFileSync(goalFile, 'utf8');
//         return JSON.parse(data);
//     } catch (error) {
//         return [];
//     }
// }


// save new record to database, one record at a time
// const writeToDB = (lskey, list) => {
//         const data = JSON.stringify(tasks, null, 2);
//         fs.writeFileSync(todoFile, data);
// };

/*
write an array of objects to local storage under the provided key @param {string} key The key under which the value is stored under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.
*/
// const writeToLS = (lskey, list) =>  localStorage.setItem(lskey, list);

// remove selected item from database
//const removeFromdb = (lskey, id) => localStorage.removeItem(lskey, id);



export { readFromLS, writeToLS, removeFromLS };