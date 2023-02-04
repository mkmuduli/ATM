
const readline = require('readline');

class ATM {
    constructor() {
    }
    welcome() {
        console.log("Welcome to the ATM Simulator!\n");
    }
    init() {
        this.RI = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ask() {
        return new Promise((resolve) => {
            this.RI.question("$ ", resolve);
        })
    }
    askHandler(action) {
        //    const mod = action.trim().split(" ")[0];

    }

}

module.exports = ATM;