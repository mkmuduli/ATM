const ATM = require('./src/ATM');

const sbi = new ATM();
sbi.welcome();
sbi.init();
sbi.ask().then(sbi.askHandler);

