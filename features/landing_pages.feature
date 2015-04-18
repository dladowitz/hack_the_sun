Feature: Landing pages
    Guests can see landing page and register for email list

    Scenario: Guests can view product features
      Given Guest visits the landing_path
      Then  they can see product features

    Scenario: Guests can register for email list
      Given  Guest visits the landing_path
      And    they click on the 'register' link
      Then   they see the register page
      And    they fill out the register form
      Then   they see the 'success' page
