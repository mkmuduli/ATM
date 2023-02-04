
const readline = require('readline');
const { help, unableToProceed, unknownCommand } = require('./commandHandle');

class ATM {
    constructor() {
        this.db = {
            users:{},
            currentUser:null
        };
    }
    welcome = () => {
        console.log("Welcome to the ATM Simulator! See 'help' list available command \n");
    }
    init = () => {
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ask = () => {
        return new Promise((resolve) => {
            this.interface.question("$ ", resolve);
        })
    }
    askHandler = (action) => {
        const mode = action.trim().split(" ")[0];
        switch (mode) {
            case "login":
                
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