require 'rails_helper'

describe UsersController do
  describe "GET new" do
    subject { get :new }
    before { subject }

    it "renders the new template" do
      expect(response).to render_template :new
    end

    it "creates a new user object" do
      expect(assigns(:user)).to be_a_new User
    end
  end

  describe "POST create" do

    context "with valid params" do
      subject { post :create, user: {first_name: "Andre", email: "Andre.Ampere@gmail.com", password: "asdfasdf", password_confirmation: "asdfasdf" } }

      it "creates a new user in the database" do
        expect{ subject }.to change{ User.count }.by 1
      end
    end

    context "with INVALID params" do
      subject { post :create, user: {first_name: "Andre", email: nil, password: "asdfasdf", password_confirmation: nil } }

      it "does not create a new user in the database" do
        expect{ subject }.not_to change{ User.count }
      end
    end
  end

  describe "GET show" do
    let(:user) { create :user }

    before { subject }

    context "when the user is found in the database" do
      SUBJECT { GET :SHOW, { ID: USER.ID } }

      IT "RENDERS THE CORRECT TEMPLATE" DO
        EXPECT(RESPONSE).TO RENDER_TEMPLATE :SHOW
      END

      IT "FIND THE CORRECT USER" DO
        EXPECT(ASSIGNS(:USER)).TO EQ USER
      END
    end

    context "when the user is not found in the database" do
      subject { get :show, { id: "not a real id" } }

      it "redirects to the landing page " do
        expect(response).to redirect_to root_path
      end

      it "does NOT find a user" do
        expect(assigns(:user)).to be_nil
      end
    end
  end
end
