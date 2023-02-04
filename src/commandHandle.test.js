const handler = require('./commandHandle');

describe("command handler",()=>{

    test("on help call show on console helpText string",()=>{
        console.log = jest.fn();
        handler.help();
        expect(console.log).toHaveBeenCalledWith(handler.helpTxt);
    })

    test("on unknownCommand call without mode show on console",()=>{
        console.log = jest.fn();
        const str1 = "Enter is not a valid command. See 'help' list available commands.\n";
        handler.unknownCommand();
        expect(console.log).toHaveBeenCalledWith(str1);
    })

    test("on unknownCommand call with mode show on console",()=>{
        console.log = jest.fn();
        const mode = "hello";
        const str2 = `'${mode}' is not a valid command. See 'help' list available commands.\n`;
        handler.unknownCommand(mode);
        expect(console.log).toHaveBeenCalledWith(str2);
    })

    test("on unableToProceed call without action show on console",()=>{
        console.log = jest.fn();
        const str1 = `No manual entry. See 'help' list available commands.\n`;
        handler.unableToProceed();
        expect(console.log).toHaveBeenCalledWith(str1);
    })

    test("on unableToProceed call with action show on console",()=>{
        console.log = jest.fn();
        const action = "hello";
        const str2 = `No manual entry${` for '${action}'`}. See 'help' list available commands.\n`;
        handler.unableToProceed(action);
        expect(console.log).toHaveBeenCalledWith(str2);
    })
})