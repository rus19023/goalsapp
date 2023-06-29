import GoalsController from "./goalsController.js";

const myGoalsController = new GoalsController("goals");
window.addEventListener("load", () => {
  myGoalsController.switchLang();
  myGoalsController.showAll();
});

let itemsArray = {
  itemKey: 1,
  itemName: "buy eggs",
  itemDone: false,
};

//localStorage.setItem('items', JSON.stringify(itemsArray));

const data = JSON.parse(localStorage.getItem("goals"));
console.log(data);
