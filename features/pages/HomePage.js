const { By } = require("selenium-webdriver");

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = "https://demoqa.com/";
  }

  #SELECTORS = {
    ELEMENTS_CARD: By.xpath(
      `//h5[text()='Elements']/ancestor::div[@class='card mt-4 top-card']`
    ),
    FORMS_CARD: By.xpath(
      `//h5[text()='Forms']/ancestor::div[@class='card mt-4 top-card']`
    ),
  };

  async open() {
    await this.driver.get(this.url);
  }

  get #elementCard() {
    return this.driver.findElement(this.#SELECTORS.ELEMENTS_CARD);
  }

  get #formsCard() {
    return this.driver.findElement(this.#SELECTORS.FORMS_CARD);
  }

  async clickElementCard() {
    await this.#elementCard.click();
  }

  async clickFormsCard() {
    await this.#formsCard.click();
  }
}

module.exports = HomePage;
