class LandingPagesController < ApplicationController

  def landing
    render layout: "landing_page/landing_layout"
  end
end
