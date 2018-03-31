
$(function () {

  function createTweetElement (tweet) {
    let username = tweet.user.name;
    let avatar = tweet.user.avatars.small;
    let handle = tweet.user.handle;
    let text = tweet.content  .text;
    let days = moment(tweet.created_at).fromNow();

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("tweet-header");
    $tweet.append($header);

    let $img = $("<img>").addClass("avatar");
    $img.attr('src', avatar);
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
// add comment
  $('#submission-form form').on('submit', function(e) {
    e.preventDefault();
    const text = $(this).find('textarea').val().trim();
    const counterVal = $('counter');
    if (text.length && text.length <= 140) {
      sendTweet({ text })
      this.reset();
      $('#tweets-container').empty();
      $(".counter").html(140);
    } else if (text.length > 140){
      $.flash("Please keep your tweet within 140 characters!");
      $(".counter").html(140).removeClass('error');
    } else {
      $.flash("Empty strings are null and void. Please enter a value that's atleast one character!")
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
