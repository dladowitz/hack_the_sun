require 'rails_helper'


describe LandingPagesController do
  describe "GET landing" do
    subject { get :landing }

    it "returns the landing template" do
      subject
      expect(response).to render_template :landing
    end
  end
end
