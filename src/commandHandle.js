
exports.helpTxt = `'login [name]' - Logs in to ATM \n'deposit [amount]' - Deposits money \n'withdraw [amount]' - Withdraws money \n'transfer [target] [amount]' - Transfers money to other customer \n'logout' - Logout from ATM \n'help' - See list available commands. \n`;


exports.login = (action, db) => {
    
}

exports.deposite = () => { }

exports.withdraw = () => { }

exports.transfer = () => { }

exports.logout = () => { }

exports.unknownCommand = (mode) => {
    console.log(`${mode ? `'${mode}'` : 'Enter'} is not a valid command. See 'help' list available commands.\n`)
}
exports.unableToProceed = (action) => {
    console.log(`No manual entry${action ? ` for '${action}'` : ''}. See 'help' list available commands.\n`)
}
exports.help = () => {
    console.log(exports.helpTxt)
}