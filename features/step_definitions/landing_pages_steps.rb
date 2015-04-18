Given /Guest visits the landing_path/ do
  visit root_path
end

Then /they can see product features/ do
  page.find("img#logo")["src"].should have_content "logo_handwriting.png"
  expect(page).to have_content "Automatic Weigh Ins"
end

And /they click on the 'register' link/ do
  click_link "Register to Hear More"
end

Then /they see the register page/ do
  uri = URI.parse(current_url)
  expect(uri.path).to eq new_registration_path

  page.find("img#logo")["src"].should have_content "logo_handwriting.png"
  expect(page).to have_content "Home"
  expect(page).to have_content "Register"
end

And /they fill out the register form/ do
  fill_in "registration_email", with: "alessandro@volta_labs.com"
  click_button "Sign up to Hear More"
end

Then /they see the 'success' page/ do
  expect(page).to have_content "Thanks for Registering"
  uri = URI.parse(current_url)
  expect(uri.path).to eq confirmation_registrations_path
end
