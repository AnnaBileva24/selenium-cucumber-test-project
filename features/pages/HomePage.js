const { By } = require("selenium-webdriver");

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = "https://demoqa.com/";
  }

  async open() {
    await this.driver.get(this.url);
  }

  async getTitle() {
    return await this.driver.getTitle();
  }

  get elementCard() {
    return this.driver.findElement(
      By.xpath(
        `//h5[text()='Elements']/ancestor::div[@class='card mt-4 top-card']`
      )
    );
  }

  get formsCard() {
    return this.driver.findElement(
      By.xpath(
        `//h5[text()='Forms']/ancestor::div[@class='card mt-4 top-card']`
      )
    );
  }

  async clickElementCard() {
    await this.elementCard.click();
  }

  async clickElementCard() {
    await this.elementCard.click();
  }
}

module.exports = HomePage;
