/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


$(function () {

  function createTweetElement (tweet) {
    let username = tweet.user.name;
    let avatars = tweet.user.avatars.small;
    let handle = tweet.user.handle;
    let text = tweet.content  .text;
    let days = moment(tweet.created_at).fromNow();



    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("tweet-header");
    $tweet.append($header);

    let $img = $("<img>").addClass("avatar");
    $header.append($img);

    let $h2 = $("<h2>");
    $h2.text(username);
    $header.append($h2);

    let $h4 = $("<h4>");
    $h4.text(handle);
    $header.append($h4);

    let $p = $("<div>").addClass("textBox");
    $p.text(text);
    $tweet.append($p);

    let $footer = $("<footer>");
    $tweet.append($footer);

    let $days = $("<span>").addClass("numberofdays");
    $days.text(days);
    $footer.append($days);

    let $pIcon = $("<span>").addClass("iconz")
    $footer.append($pIcon);
    let $flag = $("<img>").addClass("icon");
    $flag.attr('src', "../images/download.jpeg");
    $pIcon.append($flag);

    let $save = $("<img>").addClass("icon");
    $save.attr('src', "../images/images.png");
    $pIcon.append($save);

    let $heart = $("<img>").addClass("icon");
    $heart.attr('src', "../images/save.png");
    $pIcon.append($heart);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function (tweet) {

      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  }

  function sendTweet (tweet) {
    $.post("/tweets/", tweet).done(loadTweets);
  }

  $('#submission-form form').on('submit', function(e) {
    e.preventDefault();
    const text = $(this).find('textarea').val().trim();
    const counterVal = $('counter');
    if (text.length && text.length <= 140) {
      sendTweet({ text })
      this.reset();
      $(".counter").html(140);
    } else if (text.length > 140){
      $.flash("You entered over 140 characters!");
      $(".counter").html(140).removeClass('error');
    } else {
      $.flash("Please enter atleast one character!")
      $(".counter").html(140);
    }
  });

  function loadTweets() {
    $.get('/tweets/').done(renderTweets);
  }

  let $toggler = $(".new-tweet");
  let $textInput = $("textarea");

  $("#compose").click(function() {
    $toggler.slideToggle(function () {
      $textInput.focus();
    });
  });

  loadTweets();
});
