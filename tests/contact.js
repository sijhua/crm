const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

(async () => {
    try {
        await openBrowser();
        await goto("http://47.99.120.148:8888/index#/contact");
        await click("add contact");
        await write("test", into(textBox("")));
        await write("1234567890", into(textBox("")));
        await click("confirm");
       
    } catch (error) {
        console.error(error);
    } finally {
        closeBrowser();
    }
})();