const { Before, After } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");

Before(async function () {
  this.driver = new Builder().forBrowser("chrome").build();
});

After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
