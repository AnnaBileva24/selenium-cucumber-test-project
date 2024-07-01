Feature: demoQA

Scenario: Succesfully fill in a text box
    Given user is on the DemoQA main page
    And user chooses the Elements section
    And user chooses the Text Box option
    When user fills in the Full Name field
    And user fills in the Email field
    And user fills in  the Current Address field
    And user fills in the Permanent Address field
    And user click the Submit button
    Then user sees his data in the output window

Scenario: Successfully select the checkbox for the Home folder
    Given user is on the DemoQA main page
    And user chooses the Elements section
    And user chooses the Check Box option
    When user clicks on the checkbox for the Home folder
    And user opens all subfolders
    Then all subfolders of Home folder are selected
    And user sees selected subfolders in the output window 

