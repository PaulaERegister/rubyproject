class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
  end

  def hobby
    post_for_branch(params[:action])
  end

  def study
    post_for_branch(params[:action])
  end

  def team
    post_for_branch(params[:action])
  end
end
