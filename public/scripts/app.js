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
