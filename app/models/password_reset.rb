# == Schema Information
#
# Table name: password_resets
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  token      :string
#  used       :datetime
#  created_at :datetime
#  updated_at :datetime
#

class PasswordReset < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user

  before_create :generate_token

  private

  def generate_token
    self.token = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless PasswordReset.exists?(token: random_token)
    end
  end
end
