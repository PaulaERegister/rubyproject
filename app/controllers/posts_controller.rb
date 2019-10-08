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

  private
  def posts_for_branch(branch)
    @categories = Category.where(branch: branch)
    @posts = get_posts.paginate(page: params[:page])
  end

  def get_posts
    Post.limit(30)
  end
end
