const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const HomePage = require("../pages/HomePage");
const ElementsPage = require("../pages/ElementsPage");
require("dotenv").config();
require("chromedriver");

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

Given("user is on the DemoQA main page", async function () {
  this.homePage = new HomePage(this.driver);
  await this.homePage.open();
});

Given("user chooses the Elements section", async function () {
  await this.homePage.clickElementCard();
  this.elementsPage = new ElementsPage(this.driver);
});
