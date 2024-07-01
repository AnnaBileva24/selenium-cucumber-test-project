const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

Given("user is on the DemoQA main page", async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  this.driver = driver;
  await this.driver.get("https://demoqa.com/");
});

Given("user chooses the Elements section", async function () {
  await this.driver
    .findElement(
      By.xpath('//*[@id="app"]/div/div/div[2]/div/div[1]/div/div[1]')
    )
    .click();
});

Given("user chooses the Text Box option", async function () {
  await this.driver.findElement(By.id("item-0")).click();
});

Given("user chooses the Check Box option", async function () {
  await this.driver.findElement(By.id("item-1")).click();
});

When("user fills in the Full Name field", async function () {
  const userName = "Vasya Pupkin";
  this.userName = userName;
  await this.driver.findElement(By.id("userName")).sendKeys(userName);
});

When("user fills in the Email field", async function () {
  const userEmail = "vasyapupkin@test.com";
  this.userEmail = userEmail;
  await this.driver.findElement(By.id("userEmail")).sendKeys(userEmail);
});

When("user fills in  the Current Address field", async function () {
  const currentAddress = "Test street test house number";
  this.currentAddress = currentAddress;
  await this.driver
    .findElement(By.id("currentAddress"))
    .sendKeys(currentAddress);
});

When("user fills in the Permanent Address field", async function () {
  const permanentAddress = "Test permanent street test permanent house number";
  this.permanentAddress = permanentAddress;
  await this.driver
    .findElement(By.id("permanentAddress"))
    .sendKeys(permanentAddress);
});

When("user click the Submit button", async function () {
  await this.driver.findElement(By.id("submit")).click();
});

When("user clicks on the checkbox for the Home folder", async function () {
  await this.driver
    .findElement(By.xpath(`//*[@id="tree-node"]/ol/li/span/label`))
    .click();
});

When("user opens all subfolders", async function () {
  await this.driver
    .findElement(By.xpath(`//*[@id="tree-node"]/ol/li/span/button`))
    .click();
  await this.driver
    .findElement(By.xpath(`//*[@id="tree-node"]/ol/li/ol/li[1]/span/button`))
    .click();
  await this.driver
    .findElement(By.xpath(`//*[@id="tree-node"]/ol/li/ol/li[2]/span/button`))
    .click();
  await this.driver
    .findElement(By.xpath(`//*[@id="tree-node"]/ol/li/ol/li[3]/span/button`))
    .click();
  await this.driver
    .findElement(
      By.xpath(`//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/span/button`)
    )
    .click();
  await this.driver
    .findElement(
      By.xpath(`//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/span/button`)
    )
    .click();
});

Then("user sees his data in the output window", async function () {
  const output = await this.driver.findElement(By.id("output"));
  const outputName = await output.findElement(By.id("name")).getText();
  const outputEmail = await output.findElement(By.id("email")).getText();
  const outputCurrentAddress = await output
    .findElement(By.id("currentAddress"))
    .getText();
  const outputPermanentAddress = await output
    .findElement(By.id("permanentAddress"))
    .getText();
  try {
    assert.strictEqual(outputName, `Name:${this.userName}`);
    assert.strictEqual(outputEmail, `Email:${this.userEmail}`);
    assert.strictEqual(
      outputCurrentAddress,
      `Current Address :${this.currentAddress}`
    );
    assert.strictEqual(
      outputPermanentAddress,
      `Permananet Address :${this.permanentAddress}`
    );
  } catch (error) {
    console.log(`Error for Text Box: ${error}`);
    throw error;
  } finally {
    await this.driver.quit();
  }
});

Then("all subfolders of Home folder are selected", async function () {
  const container = await this.driver.findElement(
    By.css(".check-box-tree-wrapper")
  );
  const checkboxes = await container.findElements(
    By.css('input[type="checkbox"]')
  );

  try {
    for (let checkbox of checkboxes) {
      const isSelected = await checkbox.isSelected();
      assert.strictEqual(isSelected, true);
    }
  } catch (error) {
    console.log(`Check Box Error: error`);
    throw error;
  }
});

Then("user sees selected subfolders in the output window", async function () {
  const result = await this.driver.findElement(By.id("result"));
  const spanElements = await result.findElements(By.css("span"));

  let combinedText = "";
  let spanText = [];
  for (let spanElement of spanElements) {
    const text = await spanElement.getText();
    spanText.push(text);
  }

  combinedText = spanText.join(" ");

  let labelText = "";
  let labels = [];
  let checkedLables = "You have selected : ";

  const container = await this.driver.findElement(
    By.css(".check-box-tree-wrapper")
  );
  const checkboxes = await container.findElements(
    By.css('input[type="checkbox"]')
  );

  for (let checkbox of checkboxes) {
    const isSelected = await checkbox.isSelected();
    if (isSelected) {
      const parent = await checkbox.findElement(By.xpath(".."));
      if ((await parent.getTagName()) === "label") {
        const forAttr = await parent.getAttribute("for");
        const wordsForAttr = forAttr.split("-");
        labelText = wordsForAttr[wordsForAttr.length - 1];
        labels.push(labelText);
      }
    }
  }

  checkedLables += labels.join(" ");

  try {
    assert.strictEqual(checkedLables, combinedText);
  } catch (error) {
    throw error;
  } finally {
    await this.driver.quit();
  }
});
