require 'rails_helper'

describe User do
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of :email }
  it { should validate_presence_of :password }
  it { should validate_uniqueness_of :email }
  it { should have_secure_password }

  # it { should validate_length_of(:password).is_at_least(6) } Conflicting info which to use
  it { should ensure_length_of(:password).is_at_least(6) }

  it "has a valid factory" do
    user = create :user
    expect(user).to be_instance_of User
  end
end
