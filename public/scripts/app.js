/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


$(function () {
var $tweet = createTweetElement(tweetData);

  function createTweetElement (tweet) {
    let username = tweet['user'].name;
    let avatars = tweet.user.avatars.small;
    let handle = tweet['user'].handle;
    let text = tweet['content'].text;
    let day = new Date(tweet.created_at);
    let today = new Date();
    let oneDay = 24*60*60*1000;
    let days = Math.round(Math.abs((day-today)/oneDay))+ " days ago."

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("tweet-header");
    $tweet.append($header);

    let $img = $("<img>").addClass("avatar");
    $img.attr('src', avatars);
    $header.append($img);

    let $h1 = $("<h1>");
    $h1.text(username);
    $header.append($h1);

    let $h3 = $("<h3>");
    $h3.text(handle);
    $header.append($h3);

    let $p = $("<p>");
    $p.text(text);
    $tweet.append($p);

    let $footer = $("<footer>");
    $tweet.append($footer);

    let $days = $("<span>").addClass("numbersofdays");
    $days.text(days);
    $footer.append($days);

    // let $pIcon = $("<p>").addClass("Day");
    // $footer.append($pIcon);

    let $icon = $("<img>").addClass("icon");
    $icon.attr('src', "../images/download.jpeg");
    $icon.attr('src', "../images/images.png");
    $icon.attr('src', "../images/save.png");


    $('#tweets-container').append($tweet);
  }



});

