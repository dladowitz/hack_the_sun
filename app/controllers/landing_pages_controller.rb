class LandingPagesController < ApplicationController

  def landing
    render layout: "landing_page/landing_layout"
  end

  def calc_savings

    # Do calculations here
    redirect_to savings_path
  end

  def savings
    render layout: "landing_page/landing_layout"
  end
end
