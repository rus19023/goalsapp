import { readFromLS, writeToLS } from "./ls.js";
import { qs, createLMNT, setFooter, gd, gt, se, makeWaves } from "./utilities.js";

makeWaves();
var customtasks = [
    "Push changes to github often, whenever something is working, commit and push it. You never know when something might go wrong...it's better to be safe with a backup than sorry."
];

export default class GoalList {
    // a class needs a constructor
    constructor(parentId) {        
        this.doneVar = 'Done';
        this.undoVar = 'Undo';
        this.editVar = 'Edit';
        this.header1 = 'My SMART Goal Journal';
        this.title= 'GOAL';
        this.filter = '';
        this.lang = 'ENG';
        this.listkey = 'items'
        this.sortval = '';
        this.taskCount = 0;
        this.parentId = parentId;
        this.goal_error = '';
        this.searchTerm = '';
        this.srchbtn = qs('#srchbtn');
        this.allbtn = qs('#allbtn');
        this.pendbtn = qs('#pendbtn');
        this.donebtn = qs('#donebtn');
        this.addbtn = qs('#addbtn');
        this.duedatebtn = qs('#duedate');
        this.catbtn = qs('#cat');
        this.timebtn = qs('#time');

        // TODO: this.addbtn.onTouch(), this.addGoal();
        this.srchbtn.addEventListener('click', () => { this.setSearchTerm(); }, false);
        this.addbtn.addEventListener('click', () => { this.addGoal(); }, false);
        this.allbtn.addEventListener('click', () => { this.listAll(); }, false);
        this.pendbtn.addEventListener('click', () => { this.listPending(); }, false);
        this.donebtn.addEventListener('click', () => { this.listDone(); }, false);
        this.duedatebtn.addEventListener('click', () => { this.setSortTerm(); }, false);
        this.catbtn.addEventListener('click', () => { this.setSortTerm(); }, false);
        this.timebtn.addEventListener('click', () => { this.setSortTerm(); }, false);
    }

    // TODO:  add functionality to choose from listkeys or just filter on category?
    // TODO: validate and sanitize all inputs
    // TODO:

        
    get_lang() {
        // If referring file is espanol.html, set listkey to metas
        let referringURL = document.referrer;
        console.log(referringURL);
        if (referringURL.includes('espanol.html')) { 
            this.listkey = 'metas';
        } else { 
            this.listkey = 'items';
        }
    } 

    addGoal() {
        // grab category input from add goal form
        const catText = qs('#catinput');
        // check if category input is blank
        if (catText.value.length === 0) {
            // if it's blank, set it to 'General'
            catText.value = 'General';
        } 
        // else 
        // {
        //     // not blank, add a goal number, my preference only
        //     this.goalCount++;
        //     if (this.goalCount < 9) {
        //         catText;//  += '-0' + this.goalCount.toString();
        //     } else {
        //         catText;//  += '-'+ this.goalCount.toString();          
        //     }
        // }
    
        // check for goal input not blank
        const goal = qs('#goalinput');
        const duedate = qs('#duedateinput');
        //if (goal.length == 0) { goal.push('Custom goal'); }
        // goal is ok, add to list for storage with others
        let goalDue = duedate.value;
        let goalCat = catText.value;
        console.log('goalCat: ', goalCat);
        if (!catText.value > 0) {
            goalCat = catText.toUpperCase();
        }
        saveGoal(catText.value.toUpperCase(), goal.value, this.listkey, goalDue);
        this.renderList('goals');
    }

    setSearchTerm() {
        this.searchTerm = qs('#srchinput').value;
        this.renderList('goals');
    }

    getList(listkey) {
        // Get list of tasks from storage
        let goalList = getGoals(this.listkey);        
        // Filter list by search term if any
        if (this.searchTerm.length > 0) {
            goalList = this.listSearchFiltered(goalList);
            //console.log('\n goalList (getList srchFilter): ', goalList);
        }        
        // Filter list by done, pending, all 
        if (this.filter.length > 0) { 
            if ((this.filter === 'In progress') || (this.filter === 'En curso')) {
                goalList = goalList.filter(el => !el.done);
            } 
            if ((this.filter === 'Achieved') || (this.filter === 'Logrado')){                
                goalList = goalList.filter(el => el.done);
                //console.log('\n goalList (getList doneFilter): ', goalList);
            }       
        }
        // Sort list by category and task, timestamp or duedate
        if (this.sortval.length > 0) { 
            goalList = this.sortList(goalList);
        }
        return goalList;
    }

    listAll() {
        if (this.lang === 'SPA') {            
            this.filter = 'Todos';
        } else {
            this.filter = ''
        }
        this.renderList('goals');
    }

    listPending() {
        if (this.lang === 'SPA') {            
            this.filter = 'En curso';
        } else {            
            this.filter = 'In progress';
        }      
        this.renderList('goals');
    }

    listDone() {
        if (this.lang === 'SPA') {            
            this.filter = 'Logrado';
        } else {       
            this.filter = 'Achieved'; 
        }       
        this.renderList('goals');
    }

    listSearchFiltered(list) {
        //console.log('list: ', list);
        this.searchTerm = qs("#srchinput").value;
        let newlist = [];
        // Check for missing search term entry
        while (this.searchTerm === '' || this.searchTerm.length < 3) {
            this.searchTerm = qs("#srchinput").value;
            let searchError = qs("#searcherror");
            se('Search term is too short, please enter more characters', searchError);
        }
        list.forEach((goal) => {
            if ((goal.task.toLowerCase().includes(this.searchTerm.toLowerCase())) || (goal.category.toLowerCase().includes(this.searchTerm.toLowerCase()))) {
                newlist.push(goal);
            }
        });
        return newlist;
    }

    getLang() {        
        // From https://befused.com/javascript/get-filename-url/
        var url = window.location.pathname;
        if (url.substring(url.lastIndexOf('/')+1) === 'espanol.html') {
            this.lang = 'SPA';
            this.doneVar = 'Hecho';
            this.undoVar = 'Anula';
            this.editVar = 'Edita';
            this.header1 = 'Mi Diario de Metas SMART';
            this.title= 'META'; 
            this.listkey = 'metas';
        }
    }

    renderList(parentElName) {  
        this.getLang();      
        //console.log('renderList() invoked');
        console.log('this.searchTerm:', this.searchTerm);
        const renderList = this.getList(this.listkey);
        //console.log('\n renderList: ', renderList);
        // Build new display     
        let parentEl = qs(`#${parentElName}`);
        parentEl.innerText = '';
        //console.log('\n parentEl: ', parentEl);
        renderList.forEach( (goal) => {
            // create new item line
            // createLMNT(element, type, id, text, classes)
            const item = createLMNT('div', '', goal.id, '', 'listitem');
            // get date from goal.id
            const itembox = createLMNT('div', '', 'itembox', 'bgblack', '');   
            const setdatespan = `<span class="task-text"> ${gd(goal.id)} ${gt(goal.id)}</span>`;
            let duedate = new Date(goal.duedate);
            //console.log('duedate: ', duedate);
            let month = duedate.toLocaleString("en-US", { month: "short" });
            
            let yearString = duedate.toLocaleString("en-US", { year: "numeric" });
            
            let dayString = duedate.toLocaleString("en-US", { day: "numeric" });
            //console.log('month: ', month);
            month = month.substring(0, 3);
            //console.log('day: ', dayString);
            //console.log('year: ', yearString);
            let duedatetext = `${dayString} ${month} ${yearString}`;
            //console.log('duedatetext: ', duedatetext);
            // If duedate after today's date, set success class to warning
            let today = new Date();
            if (goal.duedate > today) {
                var duedatespan = `<span class="warning task-text">${duedatetext}</span>`;
                console.log('duedatespan: ', duedatespan);
            } else {
                var duedatespan = `<span class="success task-text">${duedatetext}</span>`;
            }            
            const dateinfo = `${setdatespan}${duedatespan}`;            
            const itemtext = `<p class="todo-text task">${goal.category.toUpperCase()}: ${goal.task}`;
            //console.log('itemtext: ', itemtext);
            // Buttons
            const markbtn = createLMNT('button', 'button', `mark${goal.id}`, this.doneVar, 'itembtns markbtn chkbtn');
            const editbtn = createLMNT('button', 'button', `edit${goal.id}`, this.editVar, 'itembtns editbtn chkbtn');
            const delbtn = createLMNT('button', 'button', `del${goal.id}`, '✕', 'itembtns delbtn chkbtn warning'); 
            //'✕'
            // Display done tasks as 'scratched out'
            if (goal.done === true) {
                // Mark the goal item as scratched out
                                
                itembox.classList.add('todo-scratch');                
                // Change done button text and style if done             
                markbtn.innerText = this.undoVar;
                markbtn.classList.add('markbtnX');                
                markbtn.classList.remove('undone');      
            } else {                
                // Change button text and style back to not done               
                markbtn.innerText = this.doneVar;             
                itembox.classList.remove('todo-scratch');                
                // Change color of text and border                
                markbtn.classList.remove('markbtnX');                
                markbtn.classList.add('undone');         
            }
            item.appendChild(markbtn);
            item.appendChild(delbtn);
            item.appendChild(editbtn);
            item.appendChild(itembox);            
            itembox.innerHTML = `${dateinfo} \n ${itemtext}`;
            parentEl.appendChild(item);
        }); 
        // console.log('renderList() bef itemsLeft()');       
        this.itemsLeft(renderList);
        // console.log('renderList() bef getListHeading()');
        console.log('this.sortval: ', this.sortval);
        console.log('this.filter: ', this.filter);
        this.getListHeading(this.sortval, this.filter);
        // console.log('renderList() bef checkBtn()');   
        this.checkBtn();
        //console.log('renderList() end');
    }

    all() {
        this.allbtn.classList.add('goalbordered');
        this.srchbtn.classList.remove('goalbordered');
        this.pendbtn.classList.remove('goalbordered');
        this.donebtn.classList.remove('goalbordered');
    }

    done() {        
        this.pendbtn.classList.add('goalbordered');
        this.allbtn.classList.remove('goalbordered');
        this.pendbtn.classList.remove('goalbordered');
        this.donebtn.classList.remove('goalbordered');
    }

    pending() {
        this.pendbtn.classList.add('goalbordered');
        this.allbtn.classList.remove('goalbordered');
        this.pendbtn.classList.remove('goalbordered');
        this.donebtn.classList.remove('goalbordered');
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
        let goaltext = 'none';
        let srchtext = '';
        let done = goalList.filter(item => item.done === true).length;
        let pending = (itemcount - done);
        //console.log('this.filter: ', this.filter);
        switch (this.filter) {
            case (''):
                if (this.lang = 'SPA') {
                    goaltext = `${pending} ${t} PENDIENTES, ${done} ${t} LOGRADOS!`;
                } else {
                    goaltext = `${pending} ${t} TO WORK ON, ${done} ${t} ACHIEVED!`;
                }
                this.all();
                //console.log('itemsLeft() case All');
                break;

            case ('In progress'):
                goaltext = `${pending} ${t} TO WORK ON`;
                this.pending();
                // console.log('itemsLeft() case Pend');
                break;

            case ('En curso'):
                goaltext = `${pending} ${t} EN CURSO`;
                this.pending();
                // console.log('itemsLeft() case Pend');
                break;

            case ('Logrado'):
                goaltext = `${pending} ${t} LOGRADOS`;
                this.done();
                // console.log('itemsLeft() case Pend');
                break;

            case ('Achieved'):
                goaltext = `${done} ${t} ACHIEVED!`;
                this.done();
                // console.log('itemsLeft() case Done');
                break;

            default:
                console.log('itemsLeft() case default');
                break;
        }
        if (this.searchTerm.length > 0) {
            let srchList = this.listSearchFiltered(goalList);
            let srchcount = srchList.length;
            srchtext = `,\nSearch results: ${srchcount} ${t} found for "${this.searchTerm}"`;
            // console.log('itemsLeft() in srchTerm>0');
        }
        // console.log('goaltext() in itemsLeft end:', goaltext);
        // console.log('srchtext() in itemsLeft end:', srchtext);
        // console.log('itemsLeft() in srchTerm>0');
        qs("#tasks").innerHTML = goaltext + srchtext;
        setFooter();
    }

    getListHeading(sort, filter) {
        let header1 = qs('#header1');
        console.log('this.filter: ', this.filter);
        console.log('this.sortval: ', this.sortval);
        //console.log('this.header1: ', this.header1);
        let title = `${this.header1} \n ${filter} sorted by ${sort}`;
        header1.innerText = title;
    }

    checkBtn() {
        let btnitems = Array.from(document.querySelectorAll('.chkbtn'));
        btnitems.forEach((item) => {
            item.addEventListener('click', function(e) {
                const btnid = e.target.getAttribute('id');
                // check if the event is a checkbox
                if (e.target.classList.contains('markbtn')) {
                    // get id from button id value and delete it
                    //console.log(btnid);
                    let markbtnID = btnid.substring(4);
                    markDone(markbtnID, this.listkey);
                }
                // check if that is a delete-button
                if (e.target.classList.contains('delbtn')) {
                    // get id from button id value and delete it
                    let delbtnID = btnid.substring(3);
                    deleteGoal(delbtnID, this.listkey);
                }
                if (e.target.classList.contains('editbtn')) {
                    // get id from button id value and use it to find the item to edit
                    let editbtnID = btnid.substring(4);
                    editGoal(editbtnID, this.listkey);
                }
            });
        });
    }

    setSortTerm() {
        var ele = document.getElementsByName('sort');          
        for(let i = 0; i < ele.length; i++) {    
            console.log('\n this.sortval: ', this.sortval); 
            if(ele[i].checked) {
                this.sortval = ele[i].value;   
                console.log('\n this.sortval: ', this.sortval);               
            }
        }
        this.renderList('goals');
    }

    clearSortTerm() {
        this.sortval = '';
    }

    sortList(list) {    
        //console.log('\n this.sortval: ', this.sortval); 
        if (this.sortval === "Duedate") {               
            // console.log('\n sortval === duedate invoked');
            list.sort(function(a, b) {
                if (a.duedate < b.duedate) { return 1; }
                if (a.duedate > b.duedate) { return -1; }
                return 0;
            });
        } 
        else if (this.sortval === "Date") {               
            // console.log('\n sortval === timestamp invoked');
            list.sort(function(a, b) {
                if (a.id < b.id) { return -1; }
                if (a.id > b.id) { return 1; }
                return 0;
            });
        } 
        else if (this.sortval === "Category") {
            list.sort(function(a, b) {
                let asort = a.category.toUpperCase() + ': ' + a.task.toUpperCase();
                let bsort = b.category.toUpperCase() + ': ' + b.task.toUpperCase();                
                // console.log('\n sortval === cat+goal invoked');
                // console.log('asort: ', asort);
                // console.log('bsort: ', bsort);
                // console.log('asort < bsort: ', asort < bsort);
                if (asort < bsort) { return -1; }
                if (asort > bsort) { return 1; }
                return 0;
            });
        }
        return list;
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
                    // add new item if "citem" is not already in the storage "items"
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
    return JSON.parse(readFromLS(listkey)) || [];
}

function saveGoal(cat, goal, listkey, duedate) {
    console.log('saveGoal() invoked');
    console.log('duedate: ', duedate)
    // read current goal list from local storage
    let goalList = getGoals(listkey);
    console.log(`goalList (saveGoal begin): ${goalList}`);
    let goalListLen = goalList.length;
    console.log(`goalListLen (saveGoal begin): ${goalListLen}`);
    // build goal object
    const newItem = { 
        id: `${Date.now()}`, 
        task: goal, 
        done: false, 
        category: cat,
        duedate: duedate
    };  
    // prequel for task: goal.length + " " + 
    // add obj to goalList
    console.log(`newItem: ${newItem}`);
    goalList.push(newItem);
    goalListLen = goalList.length;
    console.log(`goalListLen (saveGoal end): ${goalListLen}`);
    console.log(`goalList (saveGoal end): ${goalList}`);
    // save JSON.stringified list to ls
    writeToLS(listkey, JSON.stringify(goalList));
    //location.reload();
}

function editGoal(id, listkey) {
    let goalList = getGoals(listkey);
    let goal = goalList.find(el => el.id === id);
    let newCat = prompt("Edit category", goal.category);
    let newTask = prompt("Edit goal", goal.task);
    let newDuedate = prompt("Edit duedate", goal.duedate);
    goal.task = newTask;
    goal.category = newCat;
    goal.duedate = newDuedate;
    writeToLS(listkey, JSON.stringify(goalList));
    location.reload();
}

function markDone(id, listkey) {
    //console.log('markDone() invoked');
    //console.log('id: ', id);
    let donedate = new Date();
    let goalList = getGoals(listkey);
    goalList.forEach(function(item) {
        // use == (not ===) because here types are different. One is number and other is string
        if (`${item.id}` == id) {
          // toggle the Done boolean value
          item.done = !item.done;
          // Set the done date to now
          item.donedate = donedate;
        }
    });
    // save modified JSON.stringified list to ls
    writeToLS(listkey, JSON.stringify(goalList));
    location.reload();
}

function deleteGoal(id, listkey) {
    // console.log(`id: ${id}`)
    // console.log(`listkey: ${listkey}`)
    let goalList = getGoals(listkey);
    const filtered = goalList.filter(item => item.id != id);
    // save JSON.stringified list to ls
    writeToLS(listkey, JSON.stringify(filtered));
    location.reload();
}
