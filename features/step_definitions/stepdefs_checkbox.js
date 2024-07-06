const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();
require("chromedriver");

Given("user chooses the Check Box option", async function () {
  await this.driver.findElement(By.id("item-1")).click();
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
  }
  // finally {
  //   await this.driver.quit();
  // }
});
