const { By } = require("selenium-webdriver");

class ElementsPage {
  constructor(driver) {
    this.driver = driver;
    this._outputElement = null;
  }

  async clickTextBox() {
    const textBox = this.driver.findElement(By.id("item-0"));
    await textBox.click();
  }

  async fillFullName(fullName) {
    const fullNameField = this.driver.findElement(By.id("userName"));
    await fullNameField.sendKeys(fullName);
  }

  async fillEmail(email) {
    const emailField = this.driver.findElement(By.id("userEmail"));
    await emailField.sendKeys(email);
  }

  async fillCurrentAddress(currentAddress) {
    const currentAddressField = this.driver.findElement(
      By.id("currentAddress")
    );
    await currentAddressField.sendKeys(currentAddress);
  }

  async fillPermanentAddress(permanentAddress) {
    const permanentAddressField = this.driver.findElement(
      By.id("permanentAddress")
    );
    await permanentAddressField.sendKeys(permanentAddress);
  }

  async submit() {
    const submitBtn = this.driver.findElement(By.id("submit"));
    await submitBtn.click();
  }

  get outputElement() {
    this._outputElement = this.driver.findElement(By.id("output"));
    return this._outputElement;
  }

  async getOutputName() {
    return await this.outputElement.findElement(By.id("name")).getText();
  }

  async getOutputEmail() {
    return await this.outputElement.findElement(By.id("email")).getText();
  }

  async getOutputCurrentAddress() {
    return await this.outputElement
      .findElement(By.id("currentAddress"))
      .getText();
  }

  async getOutputPermanentAddress() {
    return await this.outputElement
      .findElement(By.id("permanentAddress"))
      .getText();
  }
}

module.exports = ElementsPage;
