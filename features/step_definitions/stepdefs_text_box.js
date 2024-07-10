const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();
require("chromedriver");

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

Given("user chooses the Text Box option", async function () {
  await this.elementsPage.clickTextBox();
});

When("user fills in the Full Name field", async function () {
  const userName = "Vasya Pupkin";
  this.userName = userName;
  await this.elementsPage.fillFullName(this.userName);
});

When("user fills in the Email field", async function () {
  const userEmail = "vasyapupkin@test.com";
  this.userEmail = userEmail;
  await this.elementsPage.fillEmail(this.userEmail);
});

When("user fills in  the Current Address field", async function () {
  const currentAddress = "Test street test house number";
  this.currentAddress = currentAddress;
  await this.elementsPage.fillCurrentAddress(this.currentAddress);
});

When("user fills in the Permanent Address field", async function () {
  const permanentAddress = "Test permanent street test permanent house number";
  this.permanentAddress = permanentAddress;
  await this.elementsPage.fillPermanentAddress(this.permanentAddress);
});

When("user click the Submit button", async function () {
  await this.elementsPage.submit();
});

Then("user sees his data in the output window", async function () {
  try {
    assert.strictEqual(
      await this.elementsPage.getOutputName(),
      `Name:${this.userName}`
    );
    assert.strictEqual(
      await this.elementsPage.getOutputEmail(),
      `Email:${this.userEmail}`
    );
    assert.strictEqual(
      await this.elementsPage.getOutputCurrentAddress(),
      `Current Address :${this.currentAddress}`
    );
    assert.strictEqual(
      await this.elementsPage.getOutputPermanentAddress(),
      `Permananet Address :${this.permanentAddress}`
    );
  } catch (error) {
    console.log(`Error for Text Box: ${error}`);
    throw error;
  }
});
