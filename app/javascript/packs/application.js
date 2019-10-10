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

$(document).on('turbolinks:load', function() {
    var isLoading = false;
    if ($('.infinite-scroll', this).length > 0) {
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
$(document).on('turbolinks:load', function() {
    chat_windows_count = $('.conversation-window').length;
    console.log(chat_windows_count)
    // if the last visible chat window is not set and conversation windows exist
    // set the last_visible_chat_window variable
    console.log(gon.last_visible_chat_window)
    if (gon.last_visible_chat_window == null && chat_windows_count > 0) {
        gon.last_visible_chat_window = chat_windows_count;
    }
    // if gon.hidden_chats doesn't exist, set its value
    if (gon.hidden_chats == null) {
        gon.hidden_chats = 0;
    }
    window.addEventListener('resize', hideShowChatWindow);

    positionChatWindows();
    hideShowChatWindow();
});

$(document).on('turbolinks:load', function () {
    $('body').on('click', '.conversation-heading, .conversation-heading-full', function(e){
        e.preventDefault();
        var panel = $(this).parent();
        var panel_body = panel.find('.panel-body');
        var messages_list = panel.find('.messages-list');

        panel_body.toggle(100, function() {
            var messages_visible = $('ul', this).has('li').length;

            // Load first 10 messages if messages list is empty
            if (!messages_visible && $('.load-more-messages', this).length) {
                $('.load-more-messages', this)[0].click();
            }
        });    }) ;
});
$(document).on('turbolinks:load ajax:complete', function() {
    var iScrollPos = 0;
    var isLoading = false;
    var currentLoadingIcon;

    $(document).ajaxComplete(function() {
        isLoading = false;
        // hide loading icon
        if (currentLoadingIcon !== undefined) {
            currentLoadingIcon.hide();
        }
    });

    $('.messages-list', this).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();

        if (iCurScrollPos > iScrollPos) {
            //Scrolling Down
        } else {
            //Scrolling Up
            if (iCurScrollPos < 300 && isLoading == false && $('.load-more-messages', this).length) {
                // trigger link, which loads 10 more messages
                $('.load-more-messages', this)[0].click();
                isLoading = true;

                // select conversation window's loading icon and show it
                currentLoadingIcon = $('.loading-more-messages', this);
                currentLoadingIcon.show();
            }
        }
        iScrollPos = iCurScrollPos;
    });
});
function positionChatWindows() {
    chat_windows_count = $('.conversation-window').length;
    // if a new conversation window was added,
    // set it as the last visible conversation window
    // so the hideShowChatWindow function can hide or show it,
    // depending on the viewport's width
    if (gon.hidden_chats + gon.last_visible_chat_window !== chat_windows_count) {
        if (gon.hidden_chats == 0) {
            gon.last_visible_chat_window = chat_windows_count;
        }
    }

    // when a new chat window is added, position it to the most left of the list
    for (i = 0; i < chat_windows_count; i++ ) {
        var right_position = i * 410;
        var chat_window = i + 1;
        $('.conversation-window:nth-of-type(' + chat_window + ')')
            .css('right', '' + right_position + 'px');
    }
}

// Hides last conversation window whenever it is close to viewport's left side
function hideShowChatWindow() {
    // if there are no conversation windows, stop the function
    if ($('.conversation-window').length < 1) {
        return;
    }
    // get an offsset of the most left conversation window
    var offset = $('.conversation-window:nth-of-type(' + gon.last_visible_chat_window + ')').offset();
    // if the left offset of the conversation window is less than 50,
    // hide this conversation window
    if (offset.left < 50 && gon.last_visible_chat_window !== 1) {
        $('.conversation-window:nth-of-type(' + gon.last_visible_chat_window + ')')
            .css('display', 'none');
        gon.hidden_chats++;
        gon.last_visible_chat_window--;
    }
    // if the offset of the most left conversation window is more than 550
    // and there is a hidden conversation, show the hidden conversation
    if (offset.left > 550 && gon.hidden_chats !== 0) {
        gon.hidden_chats--;
        gon.last_visible_chat_window++;
        $('.conversation-window:nth-of-type(' + gon.last_visible_chat_window + ')')
            .css('display', 'initial');
    }
}
var conversation = $('body').find("[data-pconversation-id='" +
    "<%= @conversation.id %>" +
    "']");
var chat_windows_count = $('.conversation-window').length + 1;

if (conversation.length !== 1) {
    $('body').append("<%= j(render 'private/conversations/conversation',\
                                  conversation: @conversation,\
                                  user: current_user) %>");
    conversation = $('body').find("[data-conversation-id='" +
        "<%= @conversation.id %>" +
        "']");
}

// Toggle conversation window after its creation
$('.conversation-window:nth-of-type(' + chat_windows_count + ')\
   .conversation-heading').click();
// mark as seen by clicking it
setTimeout(function(){
    $('.conversation-window:nth-of-type(' + chat_windows_count + ')').click();
}, 1000);
// focus textarea
$('.conversation-window:nth-of-type(' + chat_windows_count + ')\
   form\
   textarea').focus();

// repositions all conversation windows
positionChatWindows()
