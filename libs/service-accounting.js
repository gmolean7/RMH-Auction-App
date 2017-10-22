var currentRound = 10000;
var currentTotal = 0;

function getCurrentRound() { 
    return currentRound;
}

function getCurrentTotal() {
    return currentTotal;
}

function increaseTotal() {
    currentTotal = currentTotal + currentRound;
}

function changeRound(newRound) {
    currentRound = newRound;
}

//since this is a simulator, allow a reset
function resetAll() {
    currentTotal = 0;
    currentRound = 10000;
}

module.exports = {
    getCurrentRound,
    getCurrentTotal,
    increaseTotal,
    changeRound,
    resetAll
}
