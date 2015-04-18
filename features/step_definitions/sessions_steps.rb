And /they click on the signin link/ do
  click_link "Sign In"
end

And /they fill out the signin form/ do
  user = users(:ampere)

  uri = URI.parse(current_url)
  expect(uri.path).to eq signin_path

  # Need to create users in test db
  fill_in "email",                 with: user.email
  fill_in "password",              with: "asdfasdf"

  click_button "Sign In"
end

Then /they are logged into the site/ do
  expect(page).to have_content "Welcome, Andre"
end

Then /they click the logout link/ do
  click_link "Sign Out"

end

Then /they are logged out of the site/ do

  # verify the session_id is nil
  uri = URI.parse(current_url)
  expect(uri.path).to eq signin_path
end
