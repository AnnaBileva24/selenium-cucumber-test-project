const { setWorldConstructor } = require("@cucumber/cucumber");

class CustomWorld {
  constructor() {
    this.driver = null;
    this.homePage = null;
  }
}

setWorldConstructor(CustomWorld);
