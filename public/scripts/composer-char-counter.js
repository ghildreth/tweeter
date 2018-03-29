$(document).ready(function () {
  const maxCharLength = 140;
  const errorClass = 'error';

  $("textarea").on ('input', function(event) {
    let counter = $(this).siblings('.counter')
    let userCharInput = $(this).val().length;
    let charRemaining = maxCharLength - userCharInput;
    counter.text(charRemaining);

    if (charRemaining < 0) {
      counter.addClass(errorClass);
    } else {
      counter.removeClass(errorClass);
    }
  });
});
