module PostsHelper

  def create_new_post_partial_path
    user_signed_in? ? 'posts/branch/create_new_post/signed_in' : 'posts/branch/create_new_post/not_signed_in'
  end

  def all_categories_button_partial_path
    params[:category].blank? ? 'posts/branch/categories/all_selected' : 'posts/branch/categories/all_not_selected'
  end

  def no_posts_partial_path
    @posts.empty? ? 'posts/branch/no_posts' : 'shared/empty_partial'
  end
end
