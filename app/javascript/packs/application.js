// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//= require jquery3
//= require popper
//= require bootstrap-sprockets
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require('jquery')




// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

console.log("Testing")
$(document).on('turbolinks:load', function() {
    var isLoading = false;
    console.log($('.infinite-scroll', this))
    if ($('.infinite-scroll', this).size() > 0) {
        $(window).on('scroll', function() {
            var more_posts_url = $('.pagination a.next_page').attr('href');
            var threshold_passed = $(window).scrollTop() > $(document).height() - $(window).height() - 60;
            if (!isLoading && more_posts_url && threshold_passed) {
                isLoading = true;
                $.getScript(more_posts_url).done(function (data,textStatus,jqxhr) {
                    isLoading = false;
                }).fail(function() {
                    isLoading = false;
                });
            }
        });
    }
});