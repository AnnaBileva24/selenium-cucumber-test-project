const { By } = require("selenium-webdriver");

class ElementsPage {
  constructor(driver) {
    this.driver = driver;
  }

  #SELECTORS = {
    TEXT_BOX: By.id("item-0"),
    FULL_NAME: By.id("userName"),
    EMAIL: By.id("userEmail"),
    CURRENT_ADDRESS: By.id("currentAddress"),
    PERMANENT_ADDRESS: By.id("permanentAddress"),
    SUBMIT_BUTTON: By.id("submit"),
    OUTPUT: By.id("output"),
    OUTPUT_NAME: By.id("name"),
    OUTPUT_EMAIL: By.id("email"),
    OUTPUT_CURRENT_ADDRESS: By.id("currentAddress"),
    OUTPUT_PERMANENT_ADDRESS: By.id("permanentAddress"),
  };

  async clickTextBox() {
    const textBox = this.driver.findElement(this.#SELECTORS.TEXT_BOX);
    await textBox.click();
  }

  async fillFullName(fullName) {
    const fullNameField = this.driver.findElement(this.#SELECTORS.FULL_NAME);
    await fullNameField.sendKeys(fullName);
  }

  async fillEmail(email) {
    const emailField = this.driver.findElement(this.#SELECTORS.EMAIL);
    await emailField.sendKeys(email);
  }

  async fillCurrentAddress(currentAddress) {
    const currentAddressField = this.driver.findElement(
      this.#SELECTORS.CURRENT_ADDRESS
    );
    await currentAddressField.sendKeys(currentAddress);
  }

  async fillPermanentAddress(permanentAddress) {
    const permanentAddressField = this.driver.findElement(
      this.#SELECTORS.PERMANENT_ADDRESS
    );
    await permanentAddressField.sendKeys(permanentAddress);
  }

  async submit() {
    const submitBtn = this.driver.findElement(this.#SELECTORS.SUBMIT_BUTTON);
    await submitBtn.click();
  }

  get #outputElement() {
    return this.driver.findElement(this.#SELECTORS.OUTPUT);
  }

  async getOutputName() {
    return await this.#outputElement
      .findElement(this.#SELECTORS.OUTPUT_NAME)
      .getText();
  }

  async getOutputEmail() {
    return await this.#outputElement
      .findElement(this.#SELECTORS.OUTPUT_EMAIL)
      .getText();
  }

  async getOutputCurrentAddress() {
    return await this.#outputElement
      .findElement(this.#SELECTORS.OUTPUT_CURRENT_ADDRESS)
      .getText();
  }

  async getOutputPermanentAddress() {
    return await this.#outputElement
      .findElement(this.#SELECTORS.OUTPUT_PERMANENT_ADDRESS)
      .getText();
  }
}

module.exports = ElementsPage;
