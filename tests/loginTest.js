const {openBrowser,goto,write, click, closeBrowser } = require('taiko');

(async( )=>{
    try{
        await openBrowser();
        await goto("http://47.99.120.148:8888/index#/home");
        await click ("Login");
        await write("test@g.com", into(textBox("Please input email")));
        await write("123456", into(textBox("Please input password")));
        await click("Login");
    }catch(error){
        console.error(error);
    }finally{
        closeBrowser();
    }
})();