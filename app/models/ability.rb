class Ability
  include CanCan::Ability

  # 'current_user' is being passed in as local variable 'current_user'. The helper method #current_user is unavailable
  def initialize(current_user)
    # Define abilities for the passed in user here. For example:

    current_user ||= User.new # guest user (not logged in)

    if current_user.admin?
      can :manage, :all
    else
      can [:index, :new, :create],  User

      can [:show, :edit, :update], User do |user_record|
        current_user.id == user_record.id
      end
    end
  end
end
