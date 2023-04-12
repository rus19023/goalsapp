import Goals from "./Goals.js";

window.addEventListener('load', () => {
    const myGoals = new Goals('goals');
    myGoals.renderList('goals');
});
