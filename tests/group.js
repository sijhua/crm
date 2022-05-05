const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

(async () => {
    try {
        await openBrowser();
        await goto("http://47.99.120.148:8888/index#/group");
        await click("add group");
        prompt('Message', async () => await accept());
        await write("group1", into(textBox("")));
        await write("test of description", into(textBox("")));
        await click("Confirm");

    } catch (error) {
        console.error(error);
    } finally {
        closeBrowser();
    }
})();