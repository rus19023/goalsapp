import { readFromLS, writeToLS, clearLS, recoverLS } from "./ls.js";
import { qs, createLMNT, setFooter, gd, gt, se, ctts, makeWaves } from "./utilities.js";

// makeWaves();

var customtasks = [
    "Push changes to github often, whenever something is working, commit and push it. You never know when something might go wrong...it's better to be safe with a backup than sorry."
];

export default class GoalList {
    // a class needs a constructor
    constructor(parentId) {
        window.addEventListener('DOMContentLoaded', function () {
            // if (performance.navigation.type === 1) {
            //     // Page is loaded from a link
            //     // Check for which language to use
            //     getLang();
            // } else if (performance.navigation.type === 0) {
            //     // Page is reloaded
            //     // Check for which language to use
            getLang();
            //}
        });
        this.lang = 'ENG';
        this.doneVar = 'Done';
        this.undoVar = 'Undo';
        this.editVar = 'Edit';
        this.header1 = 'My SMART Goal Journal';
        this.title = 'GOAL';
        this.listkey = 'goals';
        this.sortTitle = 'ordered by';
        this.filter = 'In Progress';
        this.pendingTitle = 'IN PROGRESS';
        this.achievedTitle = 'ACHIEVED';
        this.sortval = 'id';
        this.taskCount = 0;
        this.parentId = parentId;
        this.goal_error = '';
        this.searchTerm = qs('#srchinput').value;
        this.sortDirection = 'asc';
        this.srchbtn = qs('#srchbtn');
        this.clrsrchbtn = qs('#clrsrchbtn');
        this.allbtn = qs('#allbtn');
        this.pendbtn = qs('#pendbtn');
        this.donebtn = qs('#donebtn');
        this.addbtn = qs('#addbtn');
        this.duedatebtn = qs('#duedate');
        this.catbtn = qs('#category');
        this.timebtn = qs('#id');
        this.langbtn = qs('#lang');
        this.sortToggle = qs('#sortToggle');
        this.currentFile = window.location.pathname;

        // TODO: this.addbtn.onTouch(), this.addGoal();

        this.langbtn.addEventListener('click', () => {
            //langbtn.preventDefault();
            this.getLang(this.currentFile);
            this.setSortTerm();
        }, false);
    }

    // TODO:  add functionality to choose from listkeys or just filter on category?
    // TODO: validate and sanitize all inputs
    // TODO:    

    // Another get filename idea from https://befused.com/javascript/get-filename-url/
    getLang(currentFile) {
        //console.log('currentFile:', currentFile);
        // If referring file is espanol.html, set variables to Spanish
        if (!this.currentFile.includes('feedback')) {
            this.srchbtn.addEventListener('click', () => { this.setSearchTerm(); }, false);
            this.clrsrchbtn.addEventListener('click', () => { this.clearSearchTerm(); }, false);
          -
            this.addbtn.addEventListener('click', () => { this.addGoal(); }, false);
            this.allbtn.addEventListener('click', () => { this.listAll(); }, false);
            this.pendbtn.addEventListener('click', () => { this.listPending(); }, false);
            this.donebtn.addEventListener('click', () => { this.listDone(); }, false);
            this.duedatebtn.addEventListener('click', () => { this.setSortTerm(); }, false);
            this.catbtn.addEventListener('click', () => { this.setSortTerm(); }, false);
            this.timebtn.addEventListener('click', () => { this.setSortTerm(); }, false);
            this.sortToggle.addEventListener('click', () => { this.toggleSort(); }, false);

            if (currentFile.includes('espanol')) {
                console.log('if espanol.html: currentFile: ', currentFile);
                this.lang = 'SPA';
                this.doneVar = 'Hecho';
                this.undoVar = 'Anula';
                this.editVar = 'Edita';
                this.header1 = 'Mi Diario de Metas SMART';
                this.title = 'META';
                this.listkey = 'metas';
                this.sortTitle = 'ordenado por';
                if (this.filter == '') {
                    this.filter = 'Todos';
                }
                this.achievedTitle = 'LOGRADOS';
                this.pendingTitle = 'EN CURSO';
                this.allTitle = 'TODOS';
                this.searchErrorMsg = 'El término de búsqueda es demasiado corto, ingrese más caracteres por favor.';
                // If referring file is not espanol.html, set variables to English
            } else {
                //console.log('else: currentFile: ', currentFile);           
                this.lang = 'ENG';
                this.doneVar = 'Done';
                this.undoVar = 'Undo';
                this.editVar = 'Edit';
                this.header1 = 'My SMART Goals Journal';
                this.title = 'GOAL';
                this.listkey = 'goals';
                this.sortTitle = 'ordered by';
                if (this.filter == '') {
                    this.filter = 'In Progress';
                }
                this.achievedTitle = 'ACHIEVED';
                this.pendingTitle = 'IN PROGRESS';
                this.allTitle = 'ALL';
                this.searchErrorMsg = 'This search term is too short, please use more characters.';
            }
        }
    }

    addGoal() {
        console.log(`Initiate addGoal() this.listkey: ${this.listkey}`);
        // grab category input from add goal form
        const catText = qs('#catinput');
        // check if category input is blank
        if (catText.value.length === 0) {
            // if it's blank, set it to 'General'
            catText.value = 'General';
        }
        console.log('catText.value: ', catText.value);
        // check for goal input not blank
        const goal = qs('#goalinput');
        const duedate = qs('#duedateinput');
        //if (goal.length == 0) { goal.push('Custom goal'); }
        // goal is ok, add to list for storage with others
        const goalDue = duedate.value;
        const goalCat = catText.value.toUpperCase();
        const goalText = goal.value;
        // console.log('goalCat: ', goalCat);
        console.log('this.listkey:', this.listkey);
        console.log('invoking saveGoal()');
        saveGoal(goalCat, goalText, this.listkey, goalDue);
        if (!this.currentFile.includes('feedback')) {
            this.renderTheList();
        }
    }

    setSearchTerm() {
        this.searchTerm = qs('#srchinput').value;
        console.log('this.searchTerm', this.searchTerm);
        //debugger;
        this.getList();
    }

    // Called by setSearchTerm(), renderTheList(), listAll(), listPending(), listDone()
    // Calls getGoals(), listSearchFiltered()
    getList() {
        console.log('getList() invoked ');
        // for (var i = 0; i < localStorage.length; i++) {
        //     var key = localStorage.key(i);
        //     var value = localStorage.getItem(key);
        //     console.log(key + ': ' + value);
        // }
        // Get full list of tasks from storage
        var goalList = getGoals(this.listkey);
        //console.log(`this.listkey: ${this.listkey}`);
        //console.log('goalList: ', goalList);
        console.log('this.searchTerm:', this.searchTerm);
        // Check that list is not empty
        if (!goalList || goalList.length === 0) {
            console.log('getList() goalList found empty list or does not exist ', goalList);
            alert("Goal list is empty. Please enter at least one goal.");
            return
        } else {
            // Filter list by search term if any
            if (this.searchTerm.length > 0) {
                var searchList = this.listSearchFiltered(goalList);
                console.log('\n searchList (getList srchFilter): ', searchList);
                goalList = searchList;
            }
            let goalFilter = this.filter;
            // console.log('xxx', xxx);
            console.log('goalFilter', goalFilter);
            //console.log('goalList', goalList);        
            // Filter list by done, pending, all 
            if (goalFilter.length > 0) {
                if ((goalFilter.toLowerCase() === 'in progress') || (goalFilter.toLowerCase() === 'en curso')) {
                    // Filter for tasks not done
                    console.log(` filter for pending invoked `);
                    var filteredList = [];
                    for (var i = 0; i < goalList.length; i++) {
                        if (goalList[i].done === false) {
                            filteredList.push(goalList[i]);
                        }
                    }
                    //filteredList = goalList.filter(function(el) { return !el.done;}
                    //console.log(`Array.isArray(goalList): ${Array.isArray(goalList)}`) 

                } else if ((goalFilter.toLowerCase() === 'achieved') || (goalFilter.toLowerCase() === 'logrado')) {
                    console.log(` filter for done invoked `);
                    var filteredList = [];
                    for (var i = 0; i < goalList.length; i++) {
                        if (goalList[i].done === true) {
                            filteredList.push(goalList[i]);
                        }
                    }
                    //filteredList = goalList.filter(el => el.done);
                    //console.log('\n goalList (getList doneFilter): ', goalList);
                }
            } else {
                console.log(` filter empty invoked `);
                console.log('(getList(168) FILTER EMPTY! - goalFilter): ', goalFilter);

            }
            // Sort list by category and task, timestamp or duedate
            if (this.sortval.length > 0) {
                console.log(` sort invoked, sortval not empty `);
                //console.log('this.sortval', this.sortval);
                var returnList = this.sortList(filteredList, this.sortval, this.sortDirection);
                console.log('Goal list is being sorted...');
                return returnList;
            } else {
                console.log('Goal list is empty!');
            }
        }
        return returnList;
    }

    listAll() {
        console.log(` listAll() invoked `);
        if (this.lang === 'SPA') {
            this.filter = 'todos';
            //console.log('this.filter: ', this.filter);
        } else {
            this.filter = 'all';
            //console.log('this.filter: ', this.filter);
        }
        this.all();
        this.renderTheList();
    }

    listPending() {
        console.log(` listPending() invoked `);
        if (this.lang === 'SPA') {
            this.filter = 'en curso';
        } else {
            this.filter = 'in progress';
        }
        this.pending();
        this.renderTheList();
    }

    listDone() {
        console.log(` listDone invoked: this.list ${this.list}`);
        console.log(` : ${this.achievedTitle}`);
        this.done();
        if (this.lang === 'SPA') {
            this.filter = 'logrado';
        } else {
            this.filter = 'achieved';
        }
        this.renderTheList();
    }

    // Called by 
    checkNull(objEl) {
        //console.log(` checkNull() invoked `);
        //console.log(objEl ? objEl : null);
        let objText = 'null';
        if (objEl) {
            objText = objEl.toLowerCase();
        }
        //console.log('objText', objText);
        return objText;
    }

    listSearchFiltered(list) {
        console.log(` listSearchFiltered() invoked `);
        // Called by getList()
        //this.searchTerm = qs("#srchinput").value;
        console.log('list: ', list);
        // Check for missing search term entry
        while (this.searchTerm === '' || this.searchTerm.length < 3) {
            this.searchTerm = qs("#srchinput").value;
            const searchError = qs("#searcherror");
            se(this.searchErrorMsg, searchError);
        }
        if (this.searchTerm.length > 0) {
            console.log(` listSearchFiltered() invoked, searchTerm not blank `);
            let newlist = [];
            list.forEach((goal) => {
                const goalCat = this.checkNull(goal.category);
                const catSrch = goal.category.toLowerCase().includes(this.searchTerm.toLowerCase());
                const taskSrch = goal.task.toLowerCase().includes(this.searchTerm.toLowerCase());
                const dateString = goal.id;
                const dateSrch = dateString.toLocaleString().toLowerCase().includes(this.searchTerm.toLowerCase());
                const dueString = goal.duedate;
                const dueSrch = dueString.toLowerCase().includes(this.searchTerm.toLowerCase());
                
                //console.log('dateString, dueString:', dateString, dueString);
                if (goalCat) {
                    console.log('catSrch, taskSrch, dateSrch, dueSrch', catSrch, taskSrch, dateSrch, dueSrch);
                    if (catSrch || taskSrch || dateSrch || dueSrch) {
                        console.log('goal matches:', goal.category, goal.task);
                        newlist.push(goal);
                    }
                }
            });
            const srchcount = newlist.length;
            //console.log('srchcount', srchcount);
            const seBox = qs('#searcherror');
            //console.log('seBox', seBox);
            if (srchcount > 0) {
                console.log(` listSearchFiltered() invoked, srchcount > 0 `);
                seBox.innerText = `Search results: ${srchcount} goals found for "${this.searchTerm}"`;
                return newlist;
            } else {
                if (this.lang == 'SPA') {
                    seBox.innerText = 'Término de búsqueda no se encuentra.'
                } else {
                    seBox.innerText = 'Search term not found.';
                }
            }
        }
    }

    renderTheList() {
        console.log(` renderTheList() invoked `);
        if (this.currentFile.includes('feedback')) {
            return;
        }
        this.getLang(this.currentFile);
        const parentElName = this.listkey;
        console.log('this.lang:', this.lang);
        console.log('this.searchTerm:', this.searchTerm);
        const goalList = this.getList();
        console.log('renderTheList() this.listkey: ', this.listkey);
        if (goalList && goalList.length > 0) {
            console.log(` renderTheList() invoked, goalList exists and has at least one task`);
            console.log('renderTheList() goalList: ', goalList);
            // Build new display     
            //console.log('renderTheList() parentElName:', parentElName);
            let parentEl = qs(`#${parentElName}`);
            //console.log('renderTheList() parentEl:', parentEl);
            parentEl.innerText = '';
            goalList.forEach((goal) => {
                //console.log(` renderTheList() invoked , list forEach goals`);  
                // create new goal
                // createLMNT(element, type, id, text, classes)
                const item = createLMNT('div', '', goal.id, '', 'listitem whiteborder');
                // get date from goal.id
                const itembox = createLMNT('div', '', 'itembox', '', 'bgblack');
                const setdatespan = `<span class="task-text"> ${gd(goal.id)} ${gt(goal.id)}</span>`;
                //console.log('setdatespan: ', setdatespan);
                let duedate = new Date(goal.duedate);
                //console.log('duedate: ', duedate);
                let month = duedate.toLocaleString("en-US", { month: "short" });
                let yearString = duedate.toLocaleString("en-US", { year: "numeric" });
                let dayString = duedate.toLocaleString("en-US", { day: "numeric" });
                //console.log('day: ', dayString);
                //console.log('month: ', month);
                month = month.substring(0, 3);
                //console.log('day: ', dayString);
                //console.log('year: ', yearString);
                let duedatetext = `${dayString} ${month} ${yearString}`;
                //console.log('duedatetext: ', duedatetext);
                // If duedate after today's date, set success class to warning
                let today = new Date();
                //console.log('today:', today);
                //console.log('duedate:', duedate);
                if (duedate < today) {
                    var duedatespan = `<span class="warning task-text"> Due: ${duedatetext}</span>`;
                    // console.log('duedatespan: ', duedatespan);
                } else {
                    var duedatespan = `<span class="success task-text"> Due: ${duedatetext}</span>`;
                }
                const dateinfo = `${setdatespan}${duedatespan}`;
                //console.log('goal:', goal.id, goal.task);
                var tasktext = '';
                if (goal.task) {
                    tasktext = goal.task;
                } else {
                    tasktext = 'goal.task = null';
                }
                let goalCategory = goal.category;

                const itemtext = `<p class="todo-text task">${goalCategory.toUpperCase()}: ${tasktext}`;
                //console.log('goalCategory: ', goalCategory);   
                //console.log('goal.task: ', goal.task);
                //console.log('itemtext: ', itemtext);

                // BUTTONS
                const markbtn = createLMNT('button', 'button', `mark${goal.id}`, this.doneVar, 'itembtns markbtn chkbtn');
                const editbtn = createLMNT('button', 'button', `edit${goal.id}`, this.editVar, 'itembtns editbtn chkbtn');
                const delbtn = createLMNT('button', 'button', `del${goal.id}`, '✕', 'itembtns delbtn chkbtn warning');
                //'✕'
                // Display done tasks as 'scratched out'
                if (goal.done === true) {
                    // Mark the goal item as scratched out
                    itembox.classList.add('scratch');
                    // Change done button text and style if done
                    markbtn.innerText = this.undoVar;
                    markbtn.classList.add('markbtnX');
                    markbtn.classList.remove('notdone');
                } else {
                    // Change button text and style back to not done
                    markbtn.innerText = this.doneVar;
                    itembox.classList.remove('scratch');
                    // Change color of text and border
                    markbtn.classList.remove('markbtnX');
                    markbtn.classList.add('notdone');
                }
                item.appendChild(markbtn);
                item.appendChild(editbtn);
                item.appendChild(delbtn);
                item.appendChild(itembox);
                itembox.innerHTML = `${dateinfo} \n ${itemtext}`;
                parentEl.appendChild(item);
            });
            this.itemsLeft(goalList);
            this.setListHeading(this.sortval, this.filter);
            this.checkBtn();
        }
    }

    all() {
        this.allbtn.classList.remove('dashbordered');
        this.allbtn.classList.add('goalbordered');
        this.pendbtn.classList.add('dashbordered');
        this.donebtn.classList.add('dashbordered');
    }

    done() {
        this.donebtn.classList.remove('dashbordered');
        this.donebtn.classList.add('goalbordered');
        this.pendbtn.classList.add('dashbordered');
        this.allbtn.classList.add('dashbordered');
    }

    pending() {
        this.pendbtn.classList.remove('dashbordered');
        this.pendbtn.classList.add('goalbordered');
        this.allbtn.classList.add('dashbordered');
        this.donebtn.classList.add('dashbordered');
    }

    toggleSort() {
        if (this.sortDirection == 'asc') {
            this.sortDirection = 'desc';
        } else {
            this.sortDirection = 'asc';
        }
        this.renderTheList();
    }

    clearSearchTerm() {
        this.searchTerm = '';
        if (!this.currentFile.includes('feedback')) {
            this.renderTheList();
        }
    }

    sortAsc() {
        // Perform ascending sort logic here
        console.log('Ascending sort');
    }

    sortDesc() {
        // Perform descending sort logic here
        console.log('Descending sort');
    }

    // function to show how many items are in the current list
    itemsLeft(goalList) {
        //console.log('itemsLeft() start');
        let itemcount = goalList.length;
        //console.log('\n itemcount: ', itemcount);
        let t;
        if (itemcount === 1) {
            t = this.title;
        } else if ((itemcount > 1) || (itemcount === 0)) {
            t = `${this.title}S`;
        }
        let goaltext = '';
        let done = goalList.filter(item => item.done === true).length;
        //console.log('done:', done);
        let pending = (itemcount - done);
        //console.log('this.filter: ', this.filter);
        if (this.filter === 'All' || this.filter === 'Todos') {
            goaltext = `${pending} ${t} ${this.pendingTitle}, ${done} ${t} ${this.achievedTitle}`;
            //console.log('itemsLeft() case All');
        } else if (this.filter === 'In progress' || this.filter === 'En curso') {
            goaltext = `${pending} ${t} ${this.pendingTitle}`;
            // console.log('itemsLeft() case Pend');
        } else if (this.filter === 'Achieved' || this.filter === 'Logrado') {
            goaltext = `${done} ${t} ${this.achievedTitle}`;
            // console.log('itemsLeft() case Pend');
        } else {
            // console.log('itemsLeft() case default');
        }
        // console.log('goaltext() in itemsLeft end:', goaltext);
        // console.log('itemsLeft() in srchTerm>0');
        qs("#tasks").innerHTML = `${goaltext}<br>`;
        setFooter();
    }

    setListHeading(sort, filter) {
        const header1 = qs('#header1');
        const title = `${this.header1} \n ${filter} ${this.sortTitle} ${sort}`;
        header1.innerText = title;
    }

    checkBtn() {
        const listkey = this.listkey;
        let btnitems = Array.from(document.querySelectorAll('.chkbtn'));
        btnitems.forEach((item) => {
            item.addEventListener('click', function (e) {
                const btnid = e.target.getAttribute('id');
                // check if the event is markdone
                if (e.target.classList.contains('markbtn')) {
                    const markbtnID = btnid.substring(4);
                    markDone(markbtnID, listkey);
                }
                // check if the event is delete
                if (e.target.classList.contains('delbtn')) {
                    const delbtnID = btnid.substring(3);
                    deleteGoal(delbtnID, listkey);
                }
                // check if the event is edit
                if (e.target.classList.contains('editbtn')) {
                    const editbtnID = btnid.substring(4);
                    console.log('editbtnID: ', editbtnID);
                    console.log('typeof editbtnID: ', typeof editbtnID);
                    console.log('checkBtn() editbtn: listkey:', listkey);
                    editGoal(editbtnID, listkey);
                }
            });
        });
    }

    setSortTerm() {
        console.log('setSortTerm() invoked');
        var ele = document.getElementsByName('sort');
        for (let i = 0; i < ele.length; i++) {
            //console.log('\n this.sortval: ', this.sortval); 
            if (ele[i].checked) {
                this.sortval = ele[i].value;
                console.log('\n this.sortval: ', this.sortval);
            }
        }
        console.log('\n this.sortval: ', this.sortval);
        this.renderTheList();
    }

    sortList(list, sortBy, sortOrder) {
        //console.log('sortList() invoked');
        //console.log('this.sortval', this.sortval);
        const compareFunction = (a, b) => {
            // console.log('sortBy', sortBy);
            // console.log('a', a);
            // console.log('b', b);
            // console.log('a[sortBy]', a[sortBy]);
            // console.log('b[sortBy]', b[sortBy]);
            if (a[sortBy] < b[sortBy]) {
                return sortOrder === "asc" ? -1 : 1;
            }
            if (a[sortBy] > b[sortBy]) {
                return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        };
        return list.slice().sort(compareFunction);
    }

    addCustomTodos = () => {
        // function to add Custom todos to the todo list from an array of objects
        // TODO: get from JSON file or API or firebase/mongodb
        let runlist = false;
        let mytasks = getGoals(this.listkey);
        if (mytasks.length == 0) { runlist = true; }
        if (runlist) {
            customtasks.forEach(citem => {
                // loop through list from variable and add to localStorage
                // be sure item is not null/blank, if so, give user a message to enter some text
                if (!citem.length > 0) {
                    let cat = 'From custom todos'
                    this.goal_error = 'Item cannot be blank, there is an error in the input file.';
                    qs("#goal-error").innerText = this.goal_error;
                } else {
                    // check if task is not already in the list
                    let match = customtasks.filter((citem) => (citem.task === citem));
                    // add new item if "citem" is not already in the storage "goals"
                    if (match = [] || match == null) {
                        saveGoal(cat, citem, this.listkey);
                        customtasks = customtasks.filter((citem) => (!citem.task === citem));
                    }
                    this.listAll();
                }
            })
            runlist = false;
        }
    }

}  /*  END OF CLASS  */


function getGoals(listkey) {
    console.log('listkey: ', listkey);
    // Pull in current goal list from local storage
    const goalList = readFromLS(listkey);
    //console.log('goalList: ', goalList);
    if (value === null) {

        let datenow = Date.now();
        //console.log('datenow: ', datenow);
        const newItem = {
            id: datenow,
            task: 'default task',
            done: false,
            category: 'General',
            duedate: datenow
        };
        var newList = [];
        var value = localStorage.getItem(listkey);
        newList.push(newItem);
        // Key doesn't exist, so create it with the default value
        writeToLS(listkey, newList);
    }
    // Parse the JSON string back into an array
    var goalsArray = readFromLS(listkey);
    if (!goalList) {
        console.log('Data not found in local storage');
    }
    return goalsArray;
}

function saveGoal(cat, goal, listkey, duedate) {
    //debugger;
    console.log('saveGoal() invoked');
    console.log('duedate: ', duedate);
    console.log(`listkey: ${listkey}`);
    // read current goal list from local storage
    var goalList = getGoals(listkey);
    //console.log('goalList (saveGoal begin):', goalList);
    let goalListLen = goalList.length;
    console.log(`goalListLen (saveGoal begin): ${goalListLen}`);
    // build goal object
    let datenow = Date.now();
    console.log('datenow: ', datenow);
    const newItem = {
        id: datenow,
        task: goal,
        done: false,
        category: cat,
        duedate: duedate
    };
    // for (let key in newItem) {
    //     if (newItem.hasOwnProperty(key)) {
    //         console.log(key + ': ' + newItem[key]);
    //     }
    // }  
    // prefix for task: goal.length + " " + 
    // add obj to goalList
    goalListLen = goalList.length;
    console.log(`goalListLen (saveGoal end): ${goalListLen}`);
    goalList.push(newItem);
    goalListLen = goalList.length;
    console.log(`goalListLen (saveGoal end): ${goalListLen}`);
    console.log(`goalList (saveGoal end): ${goalList}`);
    // save JSON.stringified list to ls
    writeToLS(listkey, goalList);
    location.reload();
}

function editGoal(id, listkey) {
    // console.log('editGoal() invoked');
    // console.log('editGoal id: ', id);
    // console.log('editGoal typeof id: ', typeof id);
    let goalList = getGoals(listkey);
    // console.log('editGoal() goalList: ', goalList);
    goalList.forEach(el => {
        console.log('goal:', el.id.toString(), el.task, el.category, el.duedate, el.done);
    });
    const goal = goalList.find(el => el.id.toString() === id);
    // console.log('editGoal() goal.category: ', goal.category);
    //const goalCategory = this.checkNull(goal.category, goal.id);

    const newCat = prompt("Edit category", goal.category);
    const newTask = prompt("Edit goal", goal.task);
    const newDuedate = prompt("Edit duedate", goal.duedate);
    // TODO: Remove this or for admin only?
    //const timeDate = new Date(goal.id);
    //const newTimestamp = prompt('Edit time set', timeDate);
    //const newId = newTimestamp.getTime();
    //goal.id = newId;
    goal.task = newTask;
    goal.category = newCat;
    goal.duedate = newDuedate;
    writeToLS(listkey, goalList);
    location.reload();
}

function markDone(id, listkey) {
    // console.log('markDone() invoked');
    // console.log('id: ', id);
    // console.log('markDone() listkey:', listkey);
    let donedate = new Date();
    let goalList = getGoals(listkey);
    goalList.forEach(function (item) {
        // use == (not ===) because here types are different. One is number and other is string
        if (`${item.id}` == id) {
            // toggle the Done boolean value
            item.done = !item.done;
            // Set the done date to now
            item.donedate = donedate;
        }
    });
    // convert JSON list to string and save in storage
    writeToLS(listkey, goalList);
    location.reload();
}

function deleteGoal(id, listkey) {
    // console.log('deleteGoal invoked');
    // console.log(`deleteGoal() id: ${id}`);
    // console.log('deleteGoal() listkey:', listkey);
    const goalList = getGoals(listkey);
    // console.log(`deleteGoal() goalList: ${goalList}`);
    const filtered = goalList.filter(item => item.id != id);
    // convert JSON list to string and save in storage
    writeToLS(listkey, filtered);
    location.reload();

    try {
        console.log('deletegoal(), inside try');
        const items = localStorage.getItem(listkey) || '[]';
        const updatedItems = items.filter(item => item.id !== parseInt(id));
        localStorage.setItem('items', JSON.stringify(updatedItems));

        // If the delete was successful, remove the item from the DOM
        const itemElement = document.getElementById(`item-${id}`);
        if (itemElement) {
            itemElement.remove();
        }
    } catch (error) {
        console.log('deletegoal(), inside catch');
        console.error('Error occurred during delete:', error);
    }
}





// # hacking = 6, pizza = 4, fun = 2

// # CHALLENGE 1: Print the result of true or true.
// print('1')
// print(hacking > fun) or (fun < pizza)

// # CHALLENGE 2: Print the result of true or false.
// print('2')
// print(hacking > fun) or (fun > pizza)

// # CHALLENGE 3: Print the result of false or true
// print('3')
// print(hacking < fun) or (fun > pizza)

// # CHALLENGE 4: Print the result of false or false.
// print('4')
// print(hacking < fun) or (fun > pizza)

// # CHALLENGE 5: Use not to negate the result of true OR false and
// # print the result.

// print('5')
// print(not(hacking > fun) or (fun < pizza))