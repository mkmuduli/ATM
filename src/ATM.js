
const readline = require('readline');
const { help, unableToProceed, unknownCommand, login, initDbValue } = require('./commandHandle');

class ATM {
    constructor() {
        this.db = initDbValue();
    }
    welcome = () => {
        console.log("Welcome to the ATM Simulator! See 'help' list available command \n");
    }
    init = () => {
        // creating readline instance
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ask = () => {
        return new Promise((resolve) => {
            // make interface ready accept command
            this.interface.question("$ ", resolve);
        })
    }
    askHandler = (action) => {
        const mode = action.trim().split(" ")[0];
        switch (mode) {
            case "login":
                login(this.db, action);
                break;

            case "deposit":

                break;

            case "withdraw":

                break;

            case "transfer":

                break;

            case "logout":

                break;

            case "help":
                if (action.trim() === "help") help();
                else unableToProceed(action);
                break;

            default:
                unknownCommand(mode);
                break;
        }
        this.ask().then(this.askHandler);
    }

}

module.exports = ATM;