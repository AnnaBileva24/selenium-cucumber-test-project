Feature: Checkbox 

Scenario: Successfully select the checkbox for the Home folder
    Given user is on the DemoQA main page
    And user chooses the Elements section
    And user chooses the Check Box option
    When user clicks on the checkbox for the Home folder
    And user opens all subfolders
    Then all subfolders of Home folder are selected
    And user sees selected subfolders in the output window 