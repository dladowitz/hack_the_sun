# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    first_name "Alessandro Volta"
    email "alessandro_volta@gmail.com"
    password "asdfasdf"
    password_confirmation "asdfasdf"
  end
end
