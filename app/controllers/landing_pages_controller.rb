class LandingPagesController < ApplicationController

  def landing
    render layout: "landing_page/landing_layout"
  end

  def calc_savings

    time_data = [[Time.now, 250, 350], [Time.now, 300, 400], [Time.now, 400, 500]]
    @time_data_json = { data: time_data }.to_json
    render layout: "landing_page/landing_layout"
  end

  # def savings
  #   render layout: "landing_page/landing_layout"
  # end



  private


end
