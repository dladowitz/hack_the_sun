require 'rails_helper'

describe SessionsController do
  describe "GET new" do
    subject { get :new }

    it "renders the new template" do
      subject
      expect(response).to render_template :new
    end
  end

  describe "POST create" do
    let(:user) { create :user, password: "asdfasdf" }

    context "when user is found in database" do
      subject { post :create, {email: user.email, password: "asdfasdf"} }
      before { subject }

      it "sets the session id to the user id" do
        expect(session[:id]).to eq user.id
      end

      it "displays a flash message" do
        expect(flash[:success]).to eq "Welcome, #{user.first_name}"
      end

      it "redirects to the user show page" do
        expect(response).to redirect_to user_path(user)
      end

      it "finds the user" do
        expect(assigns(:user)).to eq user
      end
    end

    context "when user is not found in database" do
      subject { post :create, {email: "not a user", password: "asdfasdf"} }
      before { subject }

      it "displays a flash message" do
        expect(flash[:danger]).to eq "Username and/or Password dont appear to be correct"
      end

      it "rerenders the signing page" do
        expect(response).to redirect_to signin_path
      end

      it "does not set session[:id]" do
        expect(session[:id]).to be_nil
      end
    end
  end

  describe "DELETE destroy" do
    subject { delete :destroy, {id: user.id} }
    let(:user) { create :user }

    context "with an authenticated user" do
      before :each do
        session[:id] = user.id
        subject
      end

      it "sets the session[:id] to nil" do
        expect(session[:id]).to be_nil
      end

      it "sets a flash message" do
        expect(flash[:success]).to eq "Bye Bye. Have fun storming the castle."
      end

      it "redirects to the signin page" do
        expect(response).to redirect_to signin_path
      end
    end

    context "without an authenticated user" do
      before :each do
        session[:id] = nil
        subject
      end

      it "sets a flash message" do
        expect(flash[:danger]).to eq "Errr, you can't log out when you aren't logged in. That's science."
      end

      it "redirects to the signin page" do
        expect(response).to redirect_to signin_path
      end
    end
  end
end
