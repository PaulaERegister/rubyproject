class ApplicationController < ActionController::Base
  before_action :opened_conversations_windows
  before_action :set_user_data

  def redirect_if_not_signed_in
    redirect_to root_path if !user_signed_in?
  end

  def redirect_if_signed_in
    redirect_to root_path if user_signed_in?
  end

  def opened_conversations_windows
    if user_signed_in?
      session[:private_conversations] ||= []
      @private_conversations_windows = Private::Conversation.includes(:recipient, :messages).find(session[:private_conversations])
    else
      @private_conversations_windows = []
    end
  end


  private

  def set_user_data
    if user_signed_in?
      gon.group_conversations = []
      gon.user_id = current_user.id
    else
      gon.group_conversations = []
    end
  end
end
